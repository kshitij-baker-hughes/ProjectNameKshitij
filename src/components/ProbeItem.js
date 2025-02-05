import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import imagePaths from '../utils/imagePaths';

const ProbeItem = ({ probe, probeTypes, categories, subCategories, applications }) => {
  const imageSource = imagePaths[probe.image_path]; // Fallback to a default image if not found

  return (
    <View style={styles.probeContainer}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>Name: {probe.name}</Text>
      <Text style={styles.text}>Type: {probeTypes[probe.probe_type_id]}</Text>
      <Text style={styles.text}>Category: {categories[probe.category_id]}</Text>
      <Text style={styles.text}>Sub Category: {subCategories[probe.sub_category_id]}</Text>
      <Text style={styles.text}>Application: {applications[probe.application_id]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  probeContainer: {
    width: '48%',
    marginBottom: 16, // Add margin at the bottom
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default ProbeItem;