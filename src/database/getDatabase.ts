import { Sequelize } from "sequelize";

/**
 * Create and maintain database connection.
 *
 * @returns {object} a object which contains database instance inside.
 */
function getDatabase() {
  let instance: Sequelize;
  console.log("[DEBUG] getDatabase got invoked!");
  function createInstance() {
    const sequelize = new Sequelize("database", "user", "password", {
      host: "localhost",
      dialect: "sqlite",
      logging: false,
      storage: "database.sqlite",
    });
    return sequelize;
  }

  return {
    get database() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}

const databaseGenerator = getDatabase();

export default databaseGenerator;
