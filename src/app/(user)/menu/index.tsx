import { FlatList, StyleSheet, View } from "react-native";
import ProductListItem from "@/components/custom/ProductListItem";
import products from "@assets/data/products";

export default function TabOneScreen() {
  return (
    <>
      {" "}
      <FlatList
        data={products}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <ProductListItem key={item.id} product={item} />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({});
