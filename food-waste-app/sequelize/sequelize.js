import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/FoodWasteApp.db",
});

export { sequelize };