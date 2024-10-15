import TextComponent from "@/components/TextComponent";
import theme from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetAaraasQuery } from "@/services/aaraasService";
const search = () => {
  const [inputValue, setInputValue] = useState("");
  const [name, setname] = useState("");
  const { data, isLoading, refetch } = useGetAaraasQuery({
    page: 1,
    limit: 10,
    name: name,
  });
  const handledataByname = () => {
    setname(inputValue);
    refetch();
  };
  useEffect(() => {
    console.log("dataafterclick", data);
  }, [handledataByname]);
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TextComponent style={styles.itemTitle}>{item.name}</TextComponent> 
      <TextComponent style={styles.itemText}>City: {item.city}</TextComponent> 
      <TextComponent style={styles.itemText}>Country: {item.country}</TextComponent> 
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextComponent style={styles.titleContainer} type="2xl">
          اسلاف
        </TextComponent>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handledataByname}>
              <Ionicons name="search" size={20} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="نام کے ذریعے تلاش کریں" 
            placeholderTextColor={theme.colors.white}
            keyboardType="default"
            onSubmitEditing={handledataByname}
            returnKeyType="search"
            onChangeText={(text) => {
              setInputValue(text);
            }}
          />
        </View>
        {isLoading && <TextComponent type="xl">Loading...</TextComponent>}
        { !isLoading && data?.data?.aaraasList?.length > 0 && (
          <FlatList
            data={data.data.aaraasList} 
            keyExtractor={(item) => item._id} 
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    height: "100%",
  },
  titleContainer: {
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: theme.colors.white,
    fontWeight: "bold",
    textAlign: "right",
  },
  iconContainer: {
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
    height: 40,
    margin: 12,
    width: 300,
    paddingHorizontal: 10,
    marginHorizontal: "auto",
  },
  input: {
    fontSize: 20,
    flex: 1,
    color:theme.colors.white
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
    
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.white,
    textAlign:'right'
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.white,
    marginVertical: 4,
    textAlign:'right'
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    color: theme.colors.white,
  },
});
export default search;
