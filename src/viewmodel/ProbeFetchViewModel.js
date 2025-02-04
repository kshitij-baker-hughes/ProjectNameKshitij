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

  addProbe(name, probe_type_id, category_id, sub_category_id, application_id, image_path) {
    //console.log("Image Path at Vuew Model is : "+image_path);
    SQLiteService.insertProbe(name, probe_type_id, category_id, sub_category_id, application_id, image_path);
  }

  logAllProbes(){
    SQLiteService.logAllProbes();
  }

  fetchProbes(callback) {
    SQLiteService.getProbes((probes) => {

      probes.map((probe, index) => {
        //console.log("In fetchProbes function, before creating new list of objects of probes image path is : " + probe.image_path);
      });
      
      this.probes = probes.map(probe => new Probe(probe.id, probe.name, probe.probe_type_id, probe.category_id, probe.sub_category_id, probe.application_id, String(probe.image_path)));

      this.probes.map((probe, index) => {
        //console.log("In fetchProbes function, after creating new list of objects of probes image path is : " + probe.image_path);
      });

      callback(this.probes);
    });
  }

  fetchFilteredProbes(categories, applications, callback) {
    SQLiteService.getFilteredProbes(categories, applications, (probes) => {
      this.probes = probes.map(probe => new Probe(probe.id, probe.name, probe.probe_type_id, probe.category_id, probe.sub_category_id, probe.application_id, probe.image_path));
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