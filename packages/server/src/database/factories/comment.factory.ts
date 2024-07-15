import { faker } from "@faker-js/faker";
import { FactorizedAttrs, Factory } from "@jorgebodega/typeorm-factory";
import { Comment } from "../../entities/Comment";
import AppDataSource from "../../ormconfig";

export class CommentFactory extends Factory<Comment> {
    protected entity = Comment;
    protected dataSource = AppDataSource;

    protected attrs(): FactorizedAttrs<Comment> {
        return {
            comment: faker.lorem.text(),
            createdAt: faker.date.past(),
        };
    }
}