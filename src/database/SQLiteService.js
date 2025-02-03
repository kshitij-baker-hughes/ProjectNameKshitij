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

  createTables() {
    this.db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ProbeTypes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT UNIQUE
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT UNIQUE
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS SubCategories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sub_category TEXT UNIQUE,
          category_id INTEGER,
          FOREIGN KEY (category_id) REFERENCES Categories(id)
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Applications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          application TEXT UNIQUE
        );`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Probes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE,
          probe_type_id INTEGER,
          sub_category_id INTEGER,
          application_id INTEGER,
          FOREIGN KEY (probe_type_id) REFERENCES ProbeTypes(id),
          FOREIGN KEY (sub_category_id) REFERENCES SubCategories(id),
          FOREIGN KEY (application_id) REFERENCES Applications(id)
        );`
      );
    });
  }

  insertProbeType(type) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO ProbeTypes (type) VALUES (?);', [type]);
    });
  }

  insertCategory(category) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO Categories (category) VALUES (?);', [category]);
    });
  }

  insertSubCategory(sub_category, category_id) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO SubCategories (sub_category, category_id) VALUES (?, ?);', [sub_category, category_id]);
    });
  }

  insertApplication(application) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO Applications (application) VALUES (?);', [application]);
    });
  }

  insertProbe(name, probe_type_id, sub_category_id, application_id) {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO Probes (name, probe_type_id, sub_category_id, application_id) VALUES (?, ?, ?, ?);', [name, probe_type_id, sub_category_id, application_id]);
    });
  }

  getProbes(callback) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM Probes;', [], (tx, results) => {
        const rows = results.rows;
        let probes = [];
        for (let i = 0; i < rows.length; i++) {
          probes.push({
            ...rows.item(i),
          });
        }
        callback(probes);
      });
    });
  }
}

export default new SQLiteService();