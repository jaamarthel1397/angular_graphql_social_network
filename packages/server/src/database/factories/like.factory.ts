import Faker from 'faker';
import { Like } from "../../entities/Like";
import { define } from 'typeorm-seeding';

define(Like, (faker: typeof Faker) => {
    const like = new Like();
    like.createdAt = faker.date.past();
    return like;
  });