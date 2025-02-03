// filepath: /src/viewmodel/UserViewModel.js
import SQLiteService from '../database/SQLiteService';
import Probe from '../model/ProbeModel';

class UserViewModel {
  constructor() {
    this.probes = [];
  }

  initializeDatabase() {
    SQLiteService.createTables();
  }

  addProbeType(type) {
    SQLiteService.insertProbeType(type);
  }

  addCategory(category) {
    SQLiteService.insertCategory(category);
  }

  addSubCategory(sub_category, category_id) {
    SQLiteService.insertSubCategory(sub_category, category_id);
  }

  addApplication(application) {
    SQLiteService.insertApplication(application);
  }

  addProbe(name, probe_type_id, sub_category_id, application_id) {
    SQLiteService.insertProbe(name, probe_type_id, sub_category_id, application_id);
  }

  fetchProbes(callback) {
    SQLiteService.getProbes((probes) => {
      this.probes = probes.map(probe => new Probe(probe.id, probe.name, probe.probe_type_id, probe.sub_category_id, probe.application_id));
      callback(this.probes);
    });
  }
}

export default UserViewModel;