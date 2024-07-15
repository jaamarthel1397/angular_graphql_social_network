import { faker } from "@faker-js/faker";
import { FactorizedAttrs, Factory } from "@jorgebodega/typeorm-factory";
import { Like } from "../../entities/Like";
import AppDataSource from "../../ormconfig";

export class LikeFactory extends Factory<Like> {
    protected entity = Like;
    protected dataSource = AppDataSource;

    protected attrs(): FactorizedAttrs<Like> {
        return {
            createdAt: faker.date.past(),
        };
    }

}