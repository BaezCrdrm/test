import { Dialect, Options, Sequelize } from "sequelize";
import { initModels } from "./models/init-models";
// eslint-disable-next-line
require("dotenv").config();

const port: number = Number.parseInt(process.env.DB_PORT || "") || 3306;

let sequelize;

export function connect(params?: Options)
{
    if(!params)
    {
        params = {
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: port,
            dialect: process.env.DB_DIALECT as Dialect || "mysql"
        }
    }
    sequelize = new Sequelize(params);
}

connect();

// import models into sequelize instance
initModels(sequelize);

export default sequelize;
