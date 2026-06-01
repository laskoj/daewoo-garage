import { Pressable, StyleSheet, Text } from 'react-native';

import { useThemeStore } from '../store/themeStore';

type Props = {
  compact?: boolean;
};

export default function ThemeToggle({ compact = false }: Props) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Pressable
      style={[styles.button, compact && styles.compactButton]}
      onPress={toggleTheme}
    >
      <Text style={styles.text}>
        {isDarkMode ? '☀️ Jasny motyw' : '🌙 Ciemny motyw'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginBottom: 16,
  },
  compactButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  text: {
    color: '#fff',
    fontWeight: '800',
  },
});
