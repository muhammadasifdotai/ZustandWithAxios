import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API } from '../api';

// The route object holds navigation-related data.
// route.params contains parameters passed to the screen.
// The productId is extracted from these parameters and used within the ProductDetail component to display the relevant product details.

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.brand}>Brand: {product.brand}</Text>
      <Text style={styles.rating}>Rating: {product.rating}</Text>
      <Text style={styles.stock}>Stock: {product.stock}</Text>
      <Text style={styles.warranty}>Warranty: {product.warrantyInformation}</Text>
      <Text style={styles.shipping}>Shipping: {product.shippingInformation}</Text>
      <Text style={styles.availability}>Availability: {product.availabilityStatus}</Text>
      <Text style={styles.returnPolicy}>Return Policy: {product.returnPolicy}</Text>

      <Text style={styles.sectionHeader}>Dimensions:</Text>
      <Text>Width: {product.dimensions.width} cm</Text>
      <Text>Height: {product.dimensions.height} cm</Text>
      <Text>Depth: {product.dimensions.depth} cm</Text>

      <Text style={styles.sectionHeader}>Tags:</Text>
      {product.tags.map((tag, index) => (
        <Text key={index}>{tag}</Text>
      ))}

      <Text style={styles.sectionHeader}>Reviews:</Text>
      {product.reviews.map((review, index) => (
        <View key={index} style={styles.review}>
          <Text>{review.reviewerName}</Text>
          <Text>Rating: {review.rating}</Text>
          <Text>Comment: {review.comment}</Text>
        </View>
      ))}

      <Text style={styles.sectionHeader}>Meta:</Text>
      <Text>Barcode: {product.meta.barcode}</Text>
      <Text>QR Code: {product.meta.qrCode}</Text>
      <Text>Created At: {product.meta.createdAt}</Text>
      <Text>Updated At: {product.meta.updatedAt}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
  back: {
    backgroundColor: 'red',
    borderRadius: 7,
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  category: {
    fontSize: 16,
    marginTop: 8,
  },
  brand: {
    fontSize: 16,
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    marginTop: 8,
  },
  stock: {
    fontSize: 16,
    marginTop: 8,
  },
  warranty: {
    fontSize: 16,
    marginTop: 8,
  },
  shipping: {
    fontSize: 16,
    marginTop: 8,
  },
  availability: {
    fontSize: 16,
    marginTop: 8,
  },
  returnPolicy: {
    fontSize: 16,
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  review: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
});

export default ProductDetail;
