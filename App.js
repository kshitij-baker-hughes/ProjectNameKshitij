// filepath: /src/view/App.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import UserViewModel from '../viewmodel/UserViewModel';

const App = () => {
  const [users, setUsers] = useState([]);
  const userViewModel = new UserViewModel();

  useEffect(() => {
    userViewModel.initializeDatabase();
    userViewModel.addUser('John Doe');
    userViewModel.addUser('Jane Doe');
    userViewModel.fetchUsers(setUsers);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {users.map((user, index) => (
          <Text key={index}>{user.name}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;