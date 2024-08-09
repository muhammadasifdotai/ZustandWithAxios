import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {API} from '../api';

export default function ProductDetailTest({route}): JSX.Element {
  const {productId} = route.params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
    <View style={styles.loading}>
      <Text>Loading...</Text>
    </View>
    )
  }

  if (!product) {
    return (
    <View style={styles.loading}>
      <Text>Product not found</Text>
    </View>
    )
  }

  return (
    <ScrollView>
      <Text>{product.id}</Text>
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Text style={styles.sectionHeader}>Dimensions:</Text>
      <Text>Width: {product.dimensions.width} cm</Text>
      <Text>Height: {product.dimensions.height} cm</Text>
      <Text>Depth: {product.dimensions.depth} cm</Text>
      
      {product.tags.map((tag, index) => (
        <Text key={index}>{tag}</Text>
      ))}

      {product.reviews.map((review, index) => (
        <View key={index}>
          <Text>{review.reviewerName}</Text>
          <Text>{review.comment}</Text>
          <Text>{review.date}</Text>
        </View>
      ))}
      <Text>{product.images}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
