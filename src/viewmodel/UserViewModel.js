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

  addProbe(name, probe_type_id, sub_category_id, application_id, image_path) {
    SQLiteService.insertProbe(name, probe_type_id, sub_category_id, application_id, image_path);
  }

  fetchProbes(callback) {
    SQLiteService.getProbes((probes) => {
      this.probes = probes.map(probe => new Probe(probe.id, probe.name, probe.probe_type_id, probe.sub_category_id, probe.application_id, probe.image_path));
      callback(this.probes);
    });
  }

  fetchProbeTypes(callback) {
    SQLiteService.getProbeTypes(callback);
  }

  fetchCategories(callback) {
    SQLiteService.getCategories(callback);
  }

  fetchSubCategories(callback) {
    SQLiteService.getSubCategories(callback);
  }

  fetchApplications(callback) {
    SQLiteService.getApplications(callback);
  }
}

export default UserViewModel;