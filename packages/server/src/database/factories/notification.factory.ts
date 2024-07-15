import { faker } from "@faker-js/faker";
import { FactorizedAttrs, Factory } from "@jorgebodega/typeorm-factory";
import { Notification } from "../../entities/Notification";
import AppDataSource from "../../ormconfig";

export class NotificationFactory extends Factory<Notification> {
    protected entity = Notification;
    protected dataSource = AppDataSource;

    protected attrs(): FactorizedAttrs<Notification> {
        return {
            text: faker.lorem.words(),
            postId: 1,
            createdAt: faker.date.past(),
        };
    }
}