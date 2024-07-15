import { faker } from '@faker-js/faker';
import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { Post } from '../../entities/Post';
import AppDataSource from '../../ormconfig';

export class PostFactory extends Factory<Post> {
    protected entity = Post;
    protected dataSource = AppDataSource;

    protected attrs(): FactorizedAttrs<Post> {
        return {
            text: faker.lorem.text(),
            image: faker.image.url(),
            commentsCount: 100,
            likesCount: 200,
            latestLike: faker.person.fullName(),
            createdAt: faker.date.past()
        };
    }
}