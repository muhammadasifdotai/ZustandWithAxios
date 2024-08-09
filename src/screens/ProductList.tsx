import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API } from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  // ..................... GET Request ...........................
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('products');
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


// ..................... POST Request ...........................
useEffect(() => {
  const postData = async () => {
    try {
      const newProduct = {
        name: 'New Product',
        price: 99.99,
        description: 'It is a AI product'
      };
      const response = await API.post('products/add', newProduct);
      console.log('Product added:', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  postData();
}, []);


// ..................... PUT Request ...........................
useEffect(() => {
  const updateData = async () => {
    try {
      const updatedProduct = {
        title: 'Updated Product Name',
        price: 77.99,
      };
      const response = await API.put('products/1', updatedProduct); // Assuming `1` is the product ID
      console.log('Product updated:', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  updateData();
}, []);



// ..................... DELETE Request ...........................
useEffect(() => {
  const deleteData = async () => {
    try {
      const response = await API.delete('products/1'); // Assuming `1` is the product ID
      console.log('Product deleted:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  deleteData();
}, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default ProductList;
