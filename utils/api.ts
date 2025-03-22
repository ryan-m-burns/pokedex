import { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon';

// Cache implementation
class ApiCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private maxAge: number;

  constructor(maxAgeMs = 5 * 60 * 1000) {
    // Default 5 minutes
    this.maxAge = maxAgeMs;
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if cache entry is still valid
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

// API config and state
const apiConfig = {
  baseUrl: 'https://pokeapi.co/api/v2',
  timeout: 10000, // 10 seconds
  maxRetries: 3,
  retryDelay: 1000,
};

const apiCache = new ApiCache();

// Enhanced fetch with timeout, retry logic, and caching
async function enhancedFetch<T>(
  url: string,
  options: {
    timeout?: number;
    maxRetries?: number;
    retryDelay?: number;
    useCache?: boolean;
    forceFresh?: boolean;
  } = {}
): Promise<T> {
  const {
    timeout = apiConfig.timeout,
    maxRetries = apiConfig.maxRetries,
    retryDelay = apiConfig.retryDelay,
    useCache = true,
    forceFresh = false,
  } = options;

  // Check cache if enabled and not forcing a fresh request
  if (useCache && !forceFresh) {
    const cachedData = apiCache.get(url);
    if (cachedData) {
      console.log(`Cache hit for: ${url}`);
      return cachedData;
    }
  }

  let retries = 0;

  const fetchWithTimeout = (): Promise<T> => {
    return new Promise((resolve, reject) => {
      // Set timeout
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request timed out after ${timeout}ms`));
      }, timeout);

      fetch(url)
        .then((response) => {
          clearTimeout(timeoutId);

          if (!response.ok) {
            // Determine if we should retry based on status code
            if (response.status >= 500 && retries < maxRetries) {
              throw new Error(`Server error: ${response.status}`);
            } else if (response.status === 429) {
              throw new Error('Rate limit exceeded');
            } else {
              return Promise.reject(
                new Error(
                  `API error: ${response.status} ${response.statusText}`
                )
              );
            }
          }

          return response.json();
        })
        .then((data) => {
          // Store in cache
          if (useCache) {
            apiCache.set(url, data);
          }
          resolve(data);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  };

  // Implement retry logic
  const executeWithRetry = async (): Promise<T> => {
    try {
      return await fetchWithTimeout();
    } catch (error) {
      if (
        retries < maxRetries &&
        error instanceof Error &&
        (error.message.includes('timed out') ||
          error.message.includes('Server error') ||
          error.message.includes('Failed to fetch'))
      ) {
        retries++;
        console.log(
          `Retry ${retries}/${maxRetries} for ${url} after ${retryDelay}ms`
        );

        // Wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * retries)
        );
        return executeWithRetry();
      }

      // If we've exhausted retries or it's not a retryable error, throw
      throw error;
    }
  };

  return executeWithRetry();
}

// Function to handle API errors in a user-friendly way
function handleApiError(error: unknown): never {
  if (error instanceof Error) {
    // Customize error messages based on error type
    if (error.message.includes('timed out')) {
      throw new Error(
        'The request is taking too long. Please check your internet connection and try again.'
      );
    } else if (error.message.includes('Rate limit')) {
      throw new Error(
        'You have made too many requests. Please wait a moment before trying again.'
      );
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error(
        'Unable to connect to the Pokemon database. Please check your internet connection.'
      );
    } else if (error.message.includes('404')) {
      throw new Error(
        'Pokemon not found. Please check the name or ID and try again.'
      );
    }
  }

  // Generic fallback
  throw new Error(
    'Something went wrong while loading Pokemon data. Please try again later.'
  );
}

// Function to get Pokemon list with enhanced features
export function getPokemonList(
  url = '',
  options: {
    limit?: number;
    offset?: number;
    forceFresh?: boolean;
  } = {}
): Promise<PokemonListResponse> {
  // If no URL is provided, use the default endpoint with optional pagination
  if (!url) {
    const limit = options.limit || 20;
    const offset = options.offset || 0;
    url = `${apiConfig.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
  }

  return enhancedFetch<PokemonListResponse>(url, {
    forceFresh: options.forceFresh,
  }).catch(handleApiError);
}

// Function to get Pokemon details by ID or name
export function getPokemonDetails(
  idOrName: string | number,
  forceFresh = false
): Promise<Pokemon> {
  return enhancedFetch<Pokemon>(`${apiConfig.baseUrl}/pokemon/${idOrName}`, {
    forceFresh,
  }).catch(handleApiError);
}

// Function to get Pokemon species information
export function getPokemonSpecies(
  idOrName: string | number,
  forceFresh = false
): Promise<PokemonSpecies> {
  return enhancedFetch<PokemonSpecies>(
    `${apiConfig.baseUrl}/pokemon-species/${idOrName}`,
    { forceFresh }
  ).catch(handleApiError);
}

// Additional helper for getting multiple Pokemon in parallel
export async function getMultiplePokemon(
  ids: (string | number)[]
): Promise<Pokemon[]> {
  try {
    return await Promise.all(ids.map((id) => getPokemonDetails(id)));
  } catch (error) {
    handleApiError(error);
  }
}

// Function to clear the cache (useful for testing or when user requests fresh data)
export function clearPokemonCache(): void {
  apiCache.clear();
}

// Export configuration so it can be modified by the app if needed
export { apiConfig };
