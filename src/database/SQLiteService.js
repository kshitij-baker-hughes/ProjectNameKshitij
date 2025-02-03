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
        tx.executeSql('DROP TABLE IF EXISTS Probes;');
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
          image_path TEXT,
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

  insertProbe(name, probe_type_id, sub_category_id, application_id, image_path) {
    this.db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Probes (name, probe_type_id, sub_category_id, application_id, image_path) VALUES (?, ?, ?, ?, ?);',
        [name, probe_type_id, sub_category_id, application_id, image_path],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Inserted row:', {
              id: results.insertId,
              name,
              probe_type_id,
              sub_category_id,
              application_id,
              image_path
            });
          } else {
            console.log('Insert failed');
          }
        },
        error => {
          console.log('Insert error hua hai :', error);
        }
      );
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

  getProbeTypes(callback) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM ProbeTypes;', [], (tx, results) => {
        const rows = results.rows;
        let probeTypes = [];
        for (let i = 0; i < rows.length; i++) {
          probeTypes.push({
            ...rows.item(i),
          });
        }
        callback(probeTypes);
      });
    });
  }

  getCategories(callback) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM Categories;', [], (tx, results) => {
        const rows = results.rows;
        let categories = [];
        for (let i = 0; i < rows.length; i++) {
          categories.push({
            ...rows.item(i),
          });
        }
        callback(categories);
      });
    });
  }

  getSubCategories(callback) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM SubCategories;', [], (tx, results) => {
        const rows = results.rows;
        let subCategories = [];
        for (let i = 0; i < rows.length; i++) {
          subCategories.push({
            ...rows.item(i),
          });
        }
        callback(subCategories);
      });
    });
  }

  getApplications(callback) {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM Applications;', [], (tx, results) => {
        const rows = results.rows;
        let applications = [];
        for (let i = 0; i < rows.length; i++) {
          applications.push({
            ...rows.item(i),
          });
        }
        callback(applications);
      });
    });
  }
}

export default new SQLiteService();