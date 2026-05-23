import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useGarageStore } from '../src/store/garageStore';

export default function FavoritesScreen() {
  const favorites =
    useGarageStore(
      (state) => state.favorites
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.name}
            </Text>
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

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },
});