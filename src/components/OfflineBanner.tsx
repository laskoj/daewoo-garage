import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!(state.isConnected && state.isInternetReachable !== false));
    });

    return unsubscribe;
  }, []);

  if (!isOffline) return null;

  return (
    <Pressable style={styles.banner} accessibilityRole="alert">
      <Text style={styles.text}>Brak internetu — pokazuję dane zapisane lokalnie.</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#f97316',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
