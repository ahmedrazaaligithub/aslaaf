import React from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import TextComponent from "@/components/TextComponent";
import Ionicons from '@expo/vector-icons/Ionicons'; // Icon library
import theme from "@/theme";

// Mock notification data
const notifications = [
  { id: '1', title: "اپ ڈیٹ 1", description: "یہ نوٹیفیکیشن ایک اہم اپ ڈیٹ کے بارے میں ہے۔", type: "update" },
  { id: '2', title: "یاد دہانی", description: "یاد دہانی: اپنے پروفائل کو مکمل کریں۔", type: "reminder" },
  { id: '3', title: "آفر", description: "نئی آفرز: ابھی چیک کریں اور فائدہ اٹھائیں!", type: "offer" },
  { id: '4', title: "اطلاع", description: "آپ کے اکاؤنٹ میں نیا پیغام موصول ہوا ہے۔", type: "message" },
  { id: '5', title: "اپ ڈیٹ 2", description: "یہ نوٹیفیکیشن دوسری اہم اپ ڈیٹ کے بارے میں ہے۔", type: "update" },
  { id: '6', title: "یاد دہانی", description: "اگلی ایونٹ کے لیے تیاری کریں۔", type: "reminder" },
];

// Mapping notification types to icons
const getIconByType = (type: string) => {
  switch (type) {
    case "update":
      return "refresh-circle-outline";
    case "reminder":
      return "time-outline";
    case "offer":
      return "pricetag-outline";
    case "message":
      return "mail-outline";
    default:
      return "notifications-outline";
  }
};

export default function TabTwoScreen() {
  // Render each notification item
  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <TextComponent type="xl" style={styles.notificationTitle}>
          {item.title}
        </TextComponent>
        <TextComponent type="base" style={styles.notificationDescription}>
          {item.description}
        </TextComponent>
      </View>
      <Ionicons 
        name={getIconByType(item.type)} 
        size={24} 
        color={theme.colors.primary}
        style={styles.notificationIcon} 
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <TextComponent type="2xl" style={styles.headingColor}>
          نوٹیفیکیشنز
        </TextComponent>
        <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={30} color={theme.colors.primary} /> 
        </View>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  titleContainer: {
    flexDirection: "row", // Align heading and icon
    alignItems: "center",
    justifyContent: "flex-end",
    gap:8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
  },
  iconContainer:{
    padding:2,
    backgroundColor:theme.colors.white,
    borderRadius:20,
  },
  headingColor: {
    color: theme.colors.white,
  },
  notificationList: {
    padding: 14,
  },
  notificationItem: {
    flexDirection: "row", // Reverses the row direction
    // alignItems: "center",
    // justifyContent:"flex-start",
    backgroundColor: theme.colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android
  },
  notificationIcon: {
    marginLeft: 10,
    marginTop:15
  },
  notificationContent: {
    flex: 1,
    textAlign:"right"
  },
  notificationTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    textAlign:"right"
  },
  notificationDescription: {
    color: "#555",
    marginTop: 6,
    textAlign:"right"
  },
});
