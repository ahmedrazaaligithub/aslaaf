import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import theme from "@/theme";
import moment from "moment-hijri";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetAaraasQuery } from "@/services/aaraasService";
import TextComponent from "@/components/TextComponent";
import PaginationComponent from "@/components/Pagination";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Dropdown } from "@/components/DropdownComponent";

const hijriMonthNamesEn = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha’ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi’dah",
  "Dhu al-Hijjah",
  ];

export default function AllAaraas() {
  const [aaraas, setAaraas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("iYYYY-iMM-iDD")
  );
  const [selectedMonth, setSelectedMonth] = useState(moment().iMonth() + 1); // Default to current Hijri month

  const islamic_date = moment(selectedDate, "iYYYY-iMM-iDD").format("iDD");
  const islamic_month_number = selectedMonth;
  const islamic_month_en = hijriMonthNamesEn[islamic_month_number - 1]; // Get English month name

  const { data, isLoading, refetch } = useGetAaraasQuery({
    page: currentPage,
    limit: resultPerPage,
    islamic_month: islamic_month_en,
  });

  useEffect(() => {
    console.log(islamic_month_number, islamic_month_en, islamic_date);
    setAaraas(data?.data?.aaraasList);
  }, [
    data,
    currentPage,
    resultPerPage,
    selectedDate,
    islamic_month_en,
    selectedMonth,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex + 1); // Set the selected Hijri month (1-based index)
    refetch();
  };

  const renderItem = ({ item, index }: { item: {}; index: number }) => (
    <View style={styles.dataItem}>
      <Link href={`/ursId/${item._id}`}>
        {/* <View style={styles.textContainer}> */}
        <TextComponent type="xl" style={styles.buzurgNameText}>
          {item.name}
        </TextComponent>
        {/* </View> */}
      </Link>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <TextComponent type="xl" style={styles.emptyText}>
        آج کوئی عرس نہیں۔
      </TextComponent>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const renderMonthChip = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.chip,
        selectedMonth === index + 1 && styles.selectedChip, // Highlight the selected chip
      ]}
      onPress={() => handleMonthSelect(index)}
    >
      <TextComponent type="base" style={
        styles.chipText
        }>
        {item}
      </TextComponent>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.headerRow}>
            {/* <Dropdown items={items} value={'football'} onChange={handleMonthSelect} /> */}
            <TextComponent type="2xl" style={styles.headingText}>
              ماہ وار اعراس
            </TextComponent>
          </View>

          {/* FlatList of Hijri months as chips */}
          <FlatList
            data={hijriMonthNamesEn}
            renderItem={renderMonthChip}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.monthList}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={aaraas}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(data?.data?.totalDocuments)}
          onPageChange={handlePageChange}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.primary },
  container: { flex: 1, backgroundColor: theme.colors.primary, marginTop: 20 },
  titleContainer: { gap: 6, paddingHorizontal: 14, paddingVertical: 12 },
  flatListContainer: {
    flex: 1,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: theme.colors.white,
  },
  dataItem: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderColor: theme.colors.white,
    borderWidth: 1,
    backgroundColor: theme.colors.primary,
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 20,
  },
  buzurgNameText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  headerRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: { color: theme.colors.white },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: theme.colors.primary },
  monthList: { marginTop: 10, paddingLeft: 14 },
  chip: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.colors.primary, // Primary background
    marginRight: 8,
    borderWidth: 0, // No border by default
  },
  selectedChip: {
    borderWidth: 2, // Add a border when selected
    borderColor: theme.colors.white, // White border color
  },
  chipText: {
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  selectedChipText:{
    backgroundColor: theme.colors.primary,
  }
});

