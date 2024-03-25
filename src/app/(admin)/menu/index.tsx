import { ActivityIndicator, FlatList, Text } from "react-native";
import ProductListItem from "@/components/custom/ProductListItem";
import { useProducts } from "@/api/products/useProducts";

export default function TabOneScreen() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <ActivityIndicator />;
  if (!products) return <Text>{error?.message}</Text>;
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      renderItem={({ item }) => (
        <ProductListItem key={item.id} product={item} />
      )}
    />
  );
}
