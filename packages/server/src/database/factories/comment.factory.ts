import Faker from 'faker'
import { Comment } from "../../entities/Comment";
import { define } from 'typeorm-seeding';

define(Comment, (faker: typeof Faker) => {
    const comment = new Comment();
    comment.comment = faker.lorem.text();
    comment.createdAt = faker.date.past();
    return comment;
  });