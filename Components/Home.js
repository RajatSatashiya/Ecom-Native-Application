import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import {
  fetchProducts,
  createCart,
  addToCart,
} from "../Redux/Slices/ProductSlice";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);
  const cartId = useSelector((state) => state.productsReducer.cartId);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: item.thumbnail }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Button
          title="Add to cart"
          onPress={() => dispatch(addToCart([item]))}
        />
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Native Products</Text>
        <Button
          title="Generate a cart"
          onPress={() => dispatch(createCart(products.products))}
        />
        <FlatList data={products.products} renderItem={renderItem} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.select({ ios: 47, android: 40 }),
  },
  product: {
    margin: 10,
    backgroundColor: "#E4D6A5",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
