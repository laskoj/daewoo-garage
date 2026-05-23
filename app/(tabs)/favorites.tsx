import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useGarageStore } from '../../src/store/garageStore';

export default function FavoritesScreen() {
  const favorites = useGarageStore((state) => state.favorites);
  const removeFavorite = useGarageStore((state) => state.removeFavorite);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ulubione auta</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nie masz jeszcze ulubionych aut.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>

            <Pressable
              style={styles.button}
              onPress={() => removeFavorite(item.id)}
            >
              <Text style={styles.buttonText}>Usuń</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },

  header: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  button: {
    marginTop: 12,
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
});