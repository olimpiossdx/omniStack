import knex from 'knex';
import configuration from '../knexfile';

const env = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(env);

export default  connection;