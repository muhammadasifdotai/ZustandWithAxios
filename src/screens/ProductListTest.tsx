import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {API} from '../api';

export default function ProductListTest(): JSX.Element {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await API.get('products');
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  if (loading) {
    <View style={styles.loading}>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductDetailTest', {productId: item.id})
          }>
          <Text style={styles.titel}>{item.id}</Text>
          <Text style={styles.titel}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  titel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  }
});
