import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatBarProps {
  statName: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export default function StatBar({
  statName,
  value,
  maxValue = 255,
  color = '#4CAF50',
}: StatBarProps) {
  // TODO: Calculate the percentage width for the progress bar

  // TODO: Format the stat name for better display

  return (
    <View style={styles.container}>
      {/* TODO: Implement the stat bar UI */}
    </View>
  );
}

// TODO: Define your styles
const styles = StyleSheet.create({
  // Add your styles here
  container: {},
});
