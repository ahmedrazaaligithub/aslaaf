import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  items: DropdownItem[];
  onChange: (value: string) => void;
}

export const Dropdown = ({ value, items, onChange }: DropdownProps) => {
  return (
    <RNPickerSelect
      onValueChange={onChange}
      value={value} // Assigning the current selected value
      items={items}
      placeholder={{ label: "Select an option...", value: null }} // Optional placeholder
    />
  );
};
