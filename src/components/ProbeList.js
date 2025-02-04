// filepath: /src/components/ProbeList.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProbeItem from './ProbeItem';

const ProbeList = ({ probes, probeTypes, categories, subCategories, applications }) => {
  probes.map((probe, index) => {
    //console.log("In Probe List component, image path is : " + probe.image_path);
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
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