import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'

const User = sequelize.define(
  'User',
  {
    id: {

        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name:{

        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {

        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: 'Users' 
  }
)

export { User }