import React from "react";
import { View, TouchableOpacity ,Modal} from "react-native";
import TextComponent from "../TextComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from 'moment-hijri';
import theme from "@/theme";
const DateModal = ({
  modalVisible,
  setModalVisible,
  selectedDate,
  onChange,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextComponent type="base">
            {moment(selectedDate, "iYYYY-iMM-iDD").format("iD iMMMM iYYYY")}
          </TextComponent>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => onChange(-2)}>
              <Icon
                name="minus-circle-outline"
                size={32}
                color={theme.colors.primary}
              />
              <TextComponent type="lg">Minus 2</TextComponent>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange(-1)}>
              <Icon
                name="minus-circle"
                size={32}
                color={theme.colors.primary}
              />
              <TextComponent type="lg">Minus 1</TextComponent>
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => onChange(1)}>
              <Icon
                name="plus-circle-outline"
                size={32}
                color={theme.colors.primary}
              />
              <TextComponent type="lg">Plus 1</TextComponent>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange(2)}>
              <Icon name="plus-circle" size={32} color={theme.colors.primary} />
              <TextComponent type="lg">Plus 2</TextComponent>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Icon name="close" size={32} color={theme.colors.danger} />
            {/* <TextComponent type="lg">Close</TextComponent> */}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles ={
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', },
    modalContent: { backgroundColor: theme.colors.white, padding: 20, borderRadius: 10, alignItems: 'center', gap: 20,margin:10 },
    modalView:{justifyContent:"space-between",flexDirection:"row", width:'100%' ,padding:10, },
    closeButton:{position:"absolute",right:0}
}
export default DateModal;
