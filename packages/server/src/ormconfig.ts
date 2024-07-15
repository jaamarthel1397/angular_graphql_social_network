import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Like } from './entities/Like';
import { Post } from './entities/Post';
import { Comment } from './entities/Comment';
import { Notification } from './entities/Notification';

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "dbuser",
  password: "password",
  database: "socialdb",
  synchronize: true,
  logging: false,
  entities: [User, Like, Post, Comment, Notification],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;