import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetAaraasByIdQuery } from "@/services/aaraasService";
import theme from "@/theme"; // Assuming you have a theme setup for colors
import TextComponent from "@/components/TextComponent";

export default function UrsIdDetails() {
  const params = useLocalSearchParams();
  const id = params.ursId;

  const { data, isLoading, refetch } = useGetAaraasByIdQuery(id);

  useEffect(() => {
    console.log("Fetched data:", data);
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <TextComponent style={styles.errorText}>Data not found.</TextComponent>
      </View>
    );
  }

  const {
    name,
    description,
    wisaal_date_islamic,
    country,
    city,
    images,
  } = data.data;

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: images && images.length > 0 && images[0] !== "" ? images[0] : 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <TextComponent style={styles.nameText}>{name}</TextComponent>
        <TextComponent style={styles.locationText}>{`${city}, ${country}`}</TextComponent>
      </View>

      {/* Details Section */}
      <View style={styles.detailsCard}>
        <TextComponent style={styles.sectionTitle}>Description</TextComponent>
        <TextComponent style={styles.descriptionText}>{description}</TextComponent>
      </View>

      {/* Wisaal Date Section */}
      <View style={styles.detailsCard}>
        <TextComponent style={styles.sectionTitle}>Wisaal Date (Islamic)</TextComponent>
        <TextComponent style={styles.dateText}>
          {`${wisaal_date_islamic.date} ${wisaal_date_islamic.month} ${wisaal_date_islamic.year}`}
        </TextComponent>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
    marginVertical: 5,
  },
  locationText: {
    fontSize: 16,
    color: theme.colors.primary,
    textAlign: "center",
  },
  detailsCard: {
    backgroundColor: theme.colors.white,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: theme.colors.dark,
    lineHeight: 24,
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.dark,
  },
});
