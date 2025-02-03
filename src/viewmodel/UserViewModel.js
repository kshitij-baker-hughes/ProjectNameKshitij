// filepath: /src/viewmodel/UserViewModel.js
import SQLiteService from '../database/SQLiteService';
import User from '../model/UserModel';

class UserViewModel {
  constructor() {
    this.users = [];
  }

  initializeDatabase() {
    SQLiteService.createTable();
  }

  addUser(name) {
    SQLiteService.insertUser(name);
  }

  fetchUsers(callback) {
    SQLiteService.getUsers((users) => {
      this.users = users.map(user => new User(user.ID, user.Name));
      callback(this.users);
    });
  }
}

export default UserViewModel;