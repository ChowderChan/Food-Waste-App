import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize/sequelize.js'

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
    password:{

      type: DataTypes.STRING,
      allowNull: false
  },
    phoneNumber: {

        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: 'users' 
  }
)

export { User }