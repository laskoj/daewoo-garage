import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function CarCard({ car, onPress, onFav, isFav }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        marginVertical: 10,
        overflow: 'hidden',
        elevation: 4,
      }}
    >
      <Image
        source={{ uri: car.image }}
        style={{ width: '100%', height: 180 }}
      />

      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {car.name}
        </Text>

        <Text style={{ color: 'gray', marginTop: 4 }}>
          {car.year} • {car.engine} • {car.hp} KM
        </Text>

        <TouchableOpacity onPress={onFav}>
          <Text style={{ fontSize: 18, marginTop: 8 }}>
            {isFav ? ' Usuń z ulubionych' : ' Dodaj do ulubionych'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}