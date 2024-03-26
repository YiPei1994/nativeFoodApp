import Button from "@/components/custom/Button";
import Colors, { defaultPizzaImage } from "@/constants/Colors";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCreateProduct } from "@/api/products/useCreateProduct";
import { useProductById } from "@/api/products/useProductById";
import { useUpdateProducts } from "@/api/products/useUpdateProduct";
import { useDeleteProduct } from "@/api/products/useDeleteProduct";

function Create() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [erros, setErros] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { createProduct } = useCreateProduct();
  const { deleteProduct } = useDeleteProduct();

  const router = useRouter();

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );

  const isUpdating = !!id;
  const { data: updateProduct, error, isLoading } = useProductById(+id);
  const { updateProducts } = useUpdateProducts();

  if (isUpdating && isLoading) return <ActivityIndicator />;
  if (isUpdating && error) return <Text>{error.message} </Text>;
  if (isUpdating && !updateProduct) return;

  useEffect(() => {
    const defaultData = () => {
      if (isUpdating && updateProduct) {
        setName(updateProduct.name);
        setPrice(String(updateProduct.price));
        setImage(updateProduct.image);
      }
    };
    defaultData();
  }, []);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const resetFields = () => {
    setName(""), setPrice("");
    setErros("");
  };

  const validateInput = () => {
    setErros("");
    if (!name) {
      setErros("Name is required.");
      return false;
    }
    if (!price) {
      setErros("Price is required.");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErros("Price is not a number.");
      return false;
    }
    return true;
  };
  const onCreate = async () => {
    if (validateInput() === false) return;

    createProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
    resetFields();
  };
  const onUpdate = () => {
    if (validateInput() === false) return;
    updateProducts(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };
  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        router.replace("/(admin)");
      },
    });
  };
  const onComfirm = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update  product" : "Create product" }}
      />
      <Image
        style={styles.image}
        source={{ uri: image ? image : defaultPizzaImage }}
      />
      <Pressable onPress={pickImage}>
        <Text style={styles.textButton}>Select image</Text>
      </Pressable>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        style={styles.input}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Price </Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <Text style={{ color: "red" }}>{erros} </Text>
      <Button
        onPress={onSubmit}
        text={isUpdating ? "Update" : "Create"}
      ></Button>

      {isUpdating && (
        <Text onPress={onComfirm} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  );
}

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    marginHorizontal: "auto",
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
