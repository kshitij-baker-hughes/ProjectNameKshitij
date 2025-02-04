import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);

  const handleCategoryChange = (category) => {
    const newSelectedCategory = selectedCategory.includes(category)
      ? selectedCategory.filter(item => item !== category)
      : [...selectedCategory, category];
    setSelectedCategory(newSelectedCategory);
    onFilterChange(newSelectedCategory, selectedApplication);
  };

  const handleApplicationChange = (application) => {
    const newSelectedApplication = selectedApplication.includes(application)
      ? selectedApplication.filter(item => item !== application)
      : [...selectedApplication, application];
    setSelectedApplication(newSelectedApplication);
    onFilterChange(selectedCategory, newSelectedApplication);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Category:</Text>
      <View style={styles.dropdown}>
        <CheckBox
          isChecked={selectedCategory.includes('Straight Beam Transducers')}
          onClick={() => handleCategoryChange('Straight Beam Transducers')}
          rightText="Straight Beam Transducers"
        />
        <CheckBox
          isChecked={selectedCategory.includes('Angle Beam Transducers')}
          onClick={() => handleCategoryChange('Angle Beam Transducers')}
          rightText="Angle Beam Transducers"
        />
      </View>
      <Text style={styles.label}>Filter by Application:</Text>
      <View style={styles.dropdown}>
        <CheckBox
          isChecked={selectedApplication.includes('Plastics')}
          onClick={() => handleApplicationChange('Plastics')}
          rightText="Plastics"
        />
        <CheckBox
          isChecked={selectedApplication.includes('Composites')}
          onClick={() => handleApplicationChange('Composites')}
          rightText="Composites"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdown: {
    marginBottom: 16,
  },
});

export default FilterComponent;