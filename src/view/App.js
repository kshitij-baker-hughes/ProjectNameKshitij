// filepath: /src/view/App.js
import React, { Component } from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import UserViewModel from '../viewmodel/UserViewModel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.userViewModel = new UserViewModel();
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.userViewModel.initializeDatabase();
    this.userViewModel.addUser('Kshitij');
    this.userViewModel.addUser('Shrivastava');
    this.userViewModel.fetchUsers(this.setUsers);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setUsers = (users) => {
    if (this._isMounted) {
      this.setState({ users });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {this.state.users.map((user, index) => (
            <Text key={index}>{user.name}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;