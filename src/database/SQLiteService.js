// filepath: /src/database/SQLiteService.js
import SQLite from 'react-native-sqlite-storage';

class SQLiteService {
  constructor() {
    this.db = SQLite.openDatabase(
      {
        name: 'MainDB',
        location: 'default',
      },
      () => {},
      error => {
        console.log(error);
      }
    );
  }

  createTable() {
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);'
      );
    });
  }

  insertUser(name) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO Users (Name) VALUES (?);', [name]);
    });
  }

  getUsers(callback) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM Users;', [], (tx, results) => {
        const rows = results.rows;
        let users = [];
        for (let i = 0; i < rows.length; i++) {
          users.push({
            ...rows.item(i),
          });
        }
        callback(users);
      });
    });
  }
}

export default new SQLiteService();