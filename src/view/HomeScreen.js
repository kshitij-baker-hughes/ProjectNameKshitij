import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserViewModel from '../viewmodel/ProbeFetchViewModel';
import ProbeList from '../components/ProbeList';
import FilterComponent from '../components/FilterComponent';
//test comment
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      probes: [],
      probeTypes: {},
      categories: {},
      subCategories: {},
      applications: {},
    };
    this.userViewModel = new UserViewModel();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.userViewModel.initializeDatabase();
    this.loadInitialData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadInitialData = () => {
    this.userViewModel.addProbeType('Contact Transducers');
    this.userViewModel.addProbeType('Immersion Transducers');
    this.userViewModel.addCategory('Straight Beam Transducers');
    this.userViewModel.addCategory('Angle Beam Transducers');
    this.userViewModel.addSubCategory('Protective Face (EU)', 1);
    this.userViewModel.addSubCategory('Protective Face (NA)', 1);
    this.userViewModel.addSubCategory('Wear Resistant (EU)', 1);
    this.userViewModel.addSubCategory('Wear Resistant (NA)', 1);
    this.userViewModel.addSubCategory('Delay Line (EU)', 1);
    this.userViewModel.addSubCategory('Delay Line (NA)', 1);
    this.userViewModel.addSubCategory('Dual Element (EU)', 1);
    this.userViewModel.addSubCategory('Dual Element (NA)', 1);
    this.userViewModel.addSubCategory('Large Size', 2);
    this.userViewModel.addSubCategory('Small Size', 2);
    this.userViewModel.addSubCategory('Dual Element', 2);
    this.userViewModel.addApplication('Plastics');
    this.userViewModel.addApplication('Wall Thickness');
    this.userViewModel.addApplication('Rough Surfaces');
    for (let i = 1; i <= 30; i++) {
      const probeTypeId = i % 2 === 0 ? 1 : 2; // Alternate between 1 and 2
      const categoryId = i % 2 === 0 ? 1 : 2; // Alternate between 1 and 2
      const subCategoryId = (i % 8) + 1; // Cycle through 1 to 8
      const applicationId = (i % 3) + 1; // Cycle through 1 to 3
      const imageId = i % 2 + 1;
      const image_path_formed = `Probe_${imageId}.jpg`;
      //console.log("Image Path at Home Screen is : "+image_path_formed);
      this.userViewModel.addProbe(`Probe${i}`, probeTypeId, categoryId, subCategoryId, applicationId, image_path_formed);
    }
    this.userViewModel.fetchProbes(this.setProbes);

    this.state.probes.map((probe, index) => {
      //console.log("Hello I am here !!!! : " + probe.image_path);
    });
    this.userViewModel.fetchProbeTypes(this.setProbeTypes);
    this.userViewModel.fetchCategories(this.setCategories);
    this.userViewModel.fetchSubCategories(this.setSubCategories);
    this.userViewModel.fetchApplications(this.setApplications);

    // Log all probes after insertion
    this.userViewModel.logAllProbes();
  }

  setProbes = (probes) => {
    console.log('Setting Probes:', probes);
    if (this._isMounted) {
      
      this.setState({ probes }, () => {
        console.log('Updated State Probes:', this.state.probes); // Log the updated state
      });
    }
  }

  setProbeTypes = (probeTypes) => {
    if (this._isMounted) {
      const probeTypeMap = {};
      probeTypes.forEach(pt => {
        probeTypeMap[pt.id] = pt.type;
      });
      this.setState({ probeTypes: probeTypeMap });
    }
  }

  setCategories = (categories) => {
    if (this._isMounted) {
      const categoryMap = {};
      categories.forEach(cat => {
        categoryMap[cat.id] = cat.category;
      });
      this.setState({ categories: categoryMap });
    }
  }

  setSubCategories = (subCategories) => {
    if (this._isMounted) {
      const subCategoryMap = {};
      subCategories.forEach(subCat => {
        subCategoryMap[subCat.id] = subCat.sub_category;
      });
      this.setState({ subCategories: subCategoryMap });
    }
  }

  setApplications = (applications) => {
    if (this._isMounted) {
      const applicationMap = {};
      applications.forEach(app => {
        applicationMap[app.id] = app.application;
      });
      this.setState({ applications: applicationMap });
    }
  }

  handleFilterChange = (selectedCategories, selectedApplications) => {
    this.userViewModel.fetchFilteredProbes(selectedCategories, selectedApplications, this.setProbes);
  }

  render() {
    this.state.probes.map((probe, index) => {
      //console.log("In Home Screen component, image path passed is : " + probe.image_path);
    });
    return (
      <SafeAreaView>
        <FilterComponent onFilterChange={this.handleFilterChange} />
        <ProbeList
          probes={this.state.probes}
          probeTypes={this.state.probeTypes}
          categories={this.state.categories}
          subCategories={this.state.subCategories}
          applications={this.state.applications}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default App;