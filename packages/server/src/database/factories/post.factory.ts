import Faker from 'faker';
import { Post } from '../../entities/Post';
import { define } from 'typeorm-seeding';

define(Post, (faker: typeof Faker) => {
    const post = new Post();
    post.text = faker.lorem.text();
    post.image = faker.image.imageUrl();
    post.commentsCount = 100;
    post.likesCount = 200;
    post.latestLike = faker.name.findName();
    post.createdAt = faker.date.past();
    return post;
  });