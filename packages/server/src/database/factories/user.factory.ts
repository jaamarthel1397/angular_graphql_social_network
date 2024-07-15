import  { faker }  from "@faker-js/faker";
import { FactorizedAttrs, Factory } from "@jorgebodega/typeorm-factory";
import { User } from "../../entities/User";
import AppDataSource from "../../ormconfig";

export class UserFactory extends Factory<User> {
    protected entity = User;
    protected dataSource = AppDataSource;

    protected attrs(): FactorizedAttrs<User> {
        return {
            fullName: faker.person.fullName(),
            bio: faker.lorem.sentences(),
            email: faker.internet.email(),
            userName: faker.internet.userName(),
            password: faker.internet.password(),
            image: faker.image.url(),
            coverImage: faker.image.url(),
            postsCount: 200,
            createdAt: faker.date.past(), 
        };
    }
}