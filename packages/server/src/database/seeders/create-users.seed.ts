import { Seeder } from "@jorgebodega/typeorm-seeding";
import { UserFactory } from "../factories/user.factory";
import { DataSource } from "typeorm";
import { User } from "../../entities/User";
import { CommentFactory } from "../factories/comment.factory";
import { Comment } from "../../entities/Comment";
import { LikeFactory } from "../factories/like.factory";
import { Like } from "../../entities/Like";
import { PostFactory } from "../factories/post.factory";
import { Post } from "../../entities/Post";
import { Notification } from "../../entities/Notification";
import { NotificationFactory } from "../factories/notification.factory";

export default class UserSeeder extends Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const userFactory = new UserFactory();
        const createdUsers = await userFactory.createMany(15);

        createdUsers.forEach(async (user: User) => {
            const commentFactory = new CommentFactory();
            const comments: Comment[] = await commentFactory.createMany(Math.floor(Math.random()*10) + 1);

            comments.forEach(async (comment: Comment) => {
                comment.author = await userFactory.create();
            })

            const likeFactory = new LikeFactory();
            const likes: Like[] = await likeFactory.createMany(Math.floor(Math.random()*10) + 1);

            likes.forEach(async (like: Like) => {
                like.user = await userFactory.create();
            })

            const postFactory = new PostFactory();
            const userPosts: Post[] = await postFactory.createMany(Math.floor(Math.random()*10) + 1);

            userPosts.forEach(async(post: Post) => {
                post.comments = comments;
                post.likes = likes;
                const latestComment = await commentFactory.create();
                latestComment.author = await userFactory.create();
                post.latestComment = latestComment;
            });

            const postIds = userPosts.map((post: Post) => post.id);
            const notificationFactory = new NotificationFactory();

            const notifications: Notification[] = await notificationFactory.createMany(postIds.length);
            notifications.forEach((notification: Notification) => {
                const postId: number = postIds.pop() as number;
                notification.postId = postId;
            });

            user.posts = userPosts;
            user.notifications = notifications;
        });

        await dataSource.createEntityManager().save<User>(createdUsers);
    }
}