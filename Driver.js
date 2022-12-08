module.exports = class Driver {
     constructor(name) {
          this.name = name;
     }

     get normalizedName() {
          return this.name.replace(/[^a-zA-Z]/g, "");
     }
};
