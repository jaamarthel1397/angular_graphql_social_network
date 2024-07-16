import { Seeder, Factory } from "typeorm-seeding";
import { User } from "../../entities/User";
import { Comment } from "../../entities/Comment";
import { Like } from "../../entities/Like";
import { Post } from "../../entities/Post";
import { Notification } from "../../entities/Notification";

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        
        await factory(User)().map(async (user: User) => {
            const comments: Comment[] = await factory(Comment)().map(async (comment: Comment) => {
                comment.author = await factory(User)().create();
                return comment;
            })
            .createMany(Math.floor(Math.random() * 10) + 1);

            const likes: Like[] = await factory(Like)().map(async (like: Like) => {
                like.user = await factory(User)().create();
                return like;
            })
            .createMany(Math.floor(Math.random() * 10) + 1);

            const userPosts: Post[] = await factory(Post)().map(async (post: Post) => {
                post.comments = comments;
                post.likes = likes;
                post.latestComment = await factory(Comment)().map(async (comment: Comment) => {
                    comment.author = await factory(User)().create();
                    return comment;
                })
                .create();

                return post;
            })
            .createMany(Math.floor(Math.random() * 10) + 1);

            const postIds = userPosts.map((post: Post) => post.id);
            const notifications: Notification[] = await factory(Notification)().map(async (notification: Notification) => {
                const postId: number = postIds.pop() as number;
                notification.postId = postId;
                return notification;
            })
            .createMany(postIds.length);

            user.posts = userPosts;
            user.notifications = notifications;
            return user;
        })
        .createMany(15);
    }
}