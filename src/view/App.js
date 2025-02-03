// filepath: /src/view/App.js
import React, { Component } from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import UserViewModel from '../viewmodel/UserViewModel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      probes: []
    };
    this.userViewModel = new UserViewModel();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.userViewModel.initializeDatabase();
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
    this.userViewModel.addProbe('Probe1', 1, 1, 1);
    this.userViewModel.addProbe('Probe2', 2, 2, 2);
    this.userViewModel.fetchProbes(this.setProbes);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setProbes = (probes) => {
    if (this._isMounted) {
      this.setState({ probes });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {this.state.probes.map((probe, index) => (
            <Text key={index}>{probe.name}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;