import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize/sequelize'

const FoodItem = sequelize.define(
  'FoodItem',
  {
    id: {

        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idUser: {

        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    category: {

        type: DataTypes.STRING,
        allowNull: false 
    },
    name:{

        type: DataTypes.STRING,
        allowNull: false
    },
    expireDate: {

        type: DataTypes.DATE,
        allowNull: false
    },
    aboutItem: {

        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: 'foodItems' 
  }
)

export { FoodItem }