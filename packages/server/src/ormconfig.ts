import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "dbuser",
  password: "password",
  database: "socialdb",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;