import Colors from "@/constants/Colors";
import { Product } from "@assets/types";
import { Image, StyleSheet, Text, View } from "react-native";

type ProductListItemProps = {
  product: Product;
};

function ProductListItem({ product }: ProductListItemProps) {
  const defaultPizzaImage =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "scroll",
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
