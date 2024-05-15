import dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';

dotenv.config();

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DEV_DB, PROD_DB, NODE_ENV } =
  process.env;

const isProduction = NODE_ENV === 'production';
const sourceDir = isProduction ? 'build' : 'src';

const buildDatabasePathFromName = (
  name: string,
  withAllFiles: boolean = false,
): string => {
  if (withAllFiles) {
    return `${sourceDir}/database/${name}/**/*.{ts,js}`;
  }

  return `${sourceDir}/database/${name}`;
};

const ormDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: isProduction ? PROD_DB : DEV_DB,
  synchronize: isProduction,
  logging: false,
  entities: [buildDatabasePathFromName('entity', true)],
  migrations: [buildDatabasePathFromName('migrations', true)],
  subscribers: [buildDatabasePathFromName('subscriber', true)],
};

const ormDataSource = new DataSource(ormDataSourceOptions);

export default ormDataSource;
