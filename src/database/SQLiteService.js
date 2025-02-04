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
          category_id INTEGER,
          sub_category_id INTEGER,
          application_id INTEGER,
          image_path TEXT,
          FOREIGN KEY (probe_type_id) REFERENCES ProbeTypes(id),
          FOREIGN KEY (category_id) REFERENCES Categories(id),
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

  insertProbe(name, probe_type_id, category_id, sub_category_id, application_id, image_path) {
    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Probes WHERE name = ?;',
        [name],
        (tx, results) => {
          if (results.rows.length > 0) {
            console.log('Probe with this name already exists:', name);
          } else {
            tx.executeSql(
              'INSERT INTO Probes (name, probe_type_id, category_id, sub_category_id, application_id, image_path) VALUES (?, ?, ?, ?, ?, ?);',
              [name, probe_type_id, category_id, sub_category_id, application_id, image_path],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log('Inserted row:', {
                    id: results.insertId,
                    name,
                    probe_type_id,
                    category_id,
                    sub_category_id,
                    application_id,
                    image_path
                  });
                } else {
                  console.log('Insert failed');
                }
              },
              error => {
                console.log('Insert error:', error);
              }
            );
          }
        },
        error => {
          console.log('Select error:', error);
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

  logAllProbes() {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM Probes;', [], (tx, results) => {
        const rows = results.rows;
        let probes = [];
        for (let i = 0; i < rows.length; i++) {
          probes.push({
            ...rows.item(i),
          });
        }
        console.log('All Probes:', probes);
      });
    });
  }

  getFilteredProbes(categories, applications, callback) {
    let query = 'SELECT * FROM Probes WHERE 1=1';
    const params = [];

    if (categories.length > 0) {
      query += ' AND category_id IN (SELECT id FROM Categories WHERE category IN (?))';
      params.push(categories.join(','));
    }

    if (applications.length > 0) {
      query += ' AND application_id IN (SELECT id FROM Applications WHERE application IN (?))';
      params.push(applications.join(','));
    }

    this.db.transaction(tx => {
      tx.executeSql(query, params, (tx, results) => {
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