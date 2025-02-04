import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserViewModel from '../viewmodel/UserViewModel';
import ProbeList from '../components/ProbeList';
import FilterComponent from '../components/FilterComponent';

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
      this.userViewModel.addProbe(`Probe${i}`, 1, 1, 1, `Probe_${i % 2 + 1}.jpg`);
    }
    this.userViewModel.fetchProbes(this.setProbes);
    this.userViewModel.fetchProbeTypes(this.setProbeTypes);
    this.userViewModel.fetchCategories(this.setCategories);
    this.userViewModel.fetchSubCategories(this.setSubCategories);
    this.userViewModel.fetchApplications(this.setApplications);
  }

  setProbes = (probes) => {
    if (this._isMounted) {
      this.setState({ probes });
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