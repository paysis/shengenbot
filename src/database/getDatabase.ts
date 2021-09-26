import { Sequelize } from "sequelize";
import getTables from "./createTables";
class DatabaseStore {
  static instance: null | DatabaseStore = null;

  _database: Sequelize | undefined;

  constructor() {
    if (!DatabaseStore.instance) {
      this._database = new Sequelize("database", "user", "password", {
        host: "localhost",
        dialect: "sqlite",
        logging: false, //TODO: add LOGGING mechanism
        storage: "database.sqlite",
      });

      DatabaseStore.instance = this;
    }

    return DatabaseStore.instance;
  }

  static init() {
    return (async function () {
      const store = new DatabaseStore();

      await store.buildModels();

      return store;
    })();
  }

  async buildModels() {
    if (this.instance) await getTables(this.instance);
  }

  get instance() {
    return this._database;
  }
}

const instance = await DatabaseStore.init();
//Object.freeze(instance);

export default instance; //instance.instance is database
