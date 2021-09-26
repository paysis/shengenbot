import Sequelize from "sequelize";
//import database from "./getDatabase.js";

/**
 * Create database model.
 *
 * TIMEOUT_TABLE:
 * guildID | memberID | until
 *
 * JAIL_TABLE:
 * guildID | memberID | until
 *
 * //@returns Timeout and Jail models.
 */
async function getTables(
  dbInstance: Sequelize.Sequelize
): Promise<void> /*: Promise<{
  timeoutModel: Sequelize.ModelCtor<Sequelize.Model<any, any>> | undefined;
  jailModel: Sequelize.ModelCtor<Sequelize.Model<any, any>> | undefined;
}>*/ {
  const sequelize = dbInstance;

  const timeout_table = sequelize?.define("timeout", {
    guildID: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    memberID: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    until: {
      type: Sequelize.DATE,
      allowNull: false,
      //defaultValue: 0, // INFINITE
    },
  });

  const jail_table = sequelize?.define("jail", {
    guildID: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    memberID: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    until: {
      type: Sequelize.DATE,
      allowNull: false,
      //defaultValue: 0, // INFINITE
    },
  });

  await timeout_table?.sync();
  await jail_table?.sync();

  //return { timeoutModel: timeout_table, jailModel: jail_table };
}

export default getTables;
