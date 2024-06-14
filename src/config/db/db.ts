import Knex from 'knex';
import knexConfig from './knexfile';
import config from '..';

const environment = config.env_var.dev.appConfig.NODE_ENV;
const configOptions = knexConfig[environment];

const knex = Knex(configOptions);

export default knex;
