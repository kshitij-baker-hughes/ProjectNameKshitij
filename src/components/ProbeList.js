import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProbeItem from './ProbeItem';

const ProbeList = ({ probes, probeTypes, categories, subCategories, applications }) => {
  return (
    <View style={styles.container}>
      {probes.map((probe, index) => (
        <ProbeItem
          key={index}
          probe={probe}
          probeTypes={probeTypes}
          categories={categories}
          subCategories={subCategories}
          applications={applications}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default ProbeList;