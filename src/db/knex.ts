import knex from "knex";
import config from '../knexfile';
import { Knex } from "knex";


// Initialize knex instance with the development environment from knexfile
const environment = process.env.NODE_ENV || 'development';
const knexInstance: Knex = knex(config[environment]);

export default knexInstance;