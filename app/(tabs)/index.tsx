import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import theme from "@/theme";
import moment from 'moment-hijri';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetAaraasQuery } from "@/services/aaraasService";
import TextComponent from "@/components/TextComponent";
import PaginationComponent from "@/components/Pagination";
import DateModal from "@/components/Modals/DateModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";

const hijriMonthNamesEn = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Sani", "Jumada al-Awwal", 
  "Jumada al-Sani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", 
  "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

export default function HomeScreen() {
  const [aaraas, setAaraas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(moment().format('iYYYY-iMM-iDD'));
  const [modalVisible, setModalVisible] = useState(false);
  
  const islamic_date = moment(selectedDate, 'iYYYY-iMM-iDD').format('iDD');
  const islamic_month_number = moment(selectedDate, 'iYYYY-iMM-iDD').iMonth() + 1; // Get Hijri month number
  const islamic_month_en = hijriMonthNamesEn[islamic_month_number - 1]; // Get English month name
  
  const { data, isLoading, refetch } = useGetAaraasQuery({
    page: currentPage,
    limit: resultPerPage,
    islamic_date,
    islamic_month:islamic_month_en,
  });
  useEffect(() => {
    console.log(islamic_month_number, islamic_month_en, islamic_date);
    setAaraas(data?.data?.aaraasList);
  }, [data, currentPage, resultPerPage, selectedDate, islamic_date, islamic_month_en]);
const handlePageChange = (page:number) => {
  setCurrentPage(page);
  refetch(); // This should refetch the data
};

  const handleTaskCompleted = (index:number) => {
    setAaraas((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDateChange = async (days:number) => {
    try {
      await AsyncStorage.setItem('updatedDate', days.toString());
      const newDate = moment(selectedDate, 'iYYYY-iMM-iDD').add(days, 'days').format('iYYYY-iMM-iDD');
      setSelectedDate(newDate);
      setModalVisible(false);
      refetch()
    } catch (error) {
      console.log('error', error);
    }
  };
  const renderItem = ({ item, index }:{item:{},index:number}) => (
    <View  style={styles.dataItem}>
      <TouchableOpacity onPress={() => handleTaskCompleted(index)} accessibilityLabel="Mark task as completed">
        <Icon
          name="check-circle"
          size={24}
          style={styles.checkIcon}
          color={item.completed ? theme.colors.check : theme.colors.primary}
          />
      </TouchableOpacity>
           <Link href={`/ursDetail/${item._id}`}style={styles.link}>
      <View style={styles.textContainer}>
        <TextComponent type="xl" style={styles.buzurgNameText}>
          {item.name}
        </TextComponent>
      </View>
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TextComponent type="base" style={{ color: theme.colors.white }}>
                {moment(selectedDate, 'iYYYY-iMM-iDD').format('iD iMMMM iYYYY')}
              </TextComponent>
            </TouchableOpacity>

            <DateModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              selectedDate={selectedDate}
              onChange={handleDateChange}
            />

            <TextComponent type="2xl" style={styles.headingText}>
              آج کے اعراس
            </TextComponent>
          </View>
          <TextComponent type="base" style={styles.subHeadingText}>
            آج ان کے یوم وصال ہیں ایصال ثواب کردیجیےگا۔
          </TextComponent>
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
  container: { flex: 1, backgroundColor: theme.colors.primary,marginTop:10},
  titleContainer: { gap: 6, paddingHorizontal: 14, paddingVertical: 12 },
  flatListContainer: { flex: 1, borderTopEndRadius: 30, borderTopStartRadius: 30, backgroundColor: theme.colors.white },
    dataItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 8, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  checkIcon: { marginRight: 10 },
  textContainer: { alignItems: "flex-end", gap: 6 },
  buzurgNameText: { color: theme.colors.primary, fontWeight: "bold", textAlign: "right", fontSize: 18 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headingText: { color: theme.colors.white },
  subHeadingText: { color: theme.colors.white, textAlign: "right" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: theme.colors.primary },
});
