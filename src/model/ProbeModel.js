// filepath: /src/model/ProbeModel.js
export default class Probe {
    constructor(id, name, probe_type_id,probe_category_id, sub_category_id, application_id, image_path) {
      this.id = id;
      this.name = name;
      this.probe_type_id = probe_type_id;
      this.probe_category_id = probe_category_id;
      this.sub_category_id = sub_category_id;
      this.application_id = application_id;
      this.image_path = String(image_path);
    }
  }