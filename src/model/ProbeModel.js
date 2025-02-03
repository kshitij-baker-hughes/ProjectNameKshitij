// filepath: /src/model/ProbeModel.js
export default class Probe {
    constructor(id, name, probe_type_id, sub_category_id, application_id) {
      this.id = id;
      this.name = name;
      this.probe_type_id = probe_type_id;
      this.sub_category_id = sub_category_id;
      this.application_id = application_id;
    }
  }