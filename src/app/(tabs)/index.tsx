import products from "@/assets/data/products";
import ProductListItem from "@/src/components/custom/ProductListItem";
import { StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "scroll",
  },
});
