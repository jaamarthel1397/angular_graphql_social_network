import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne,ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';

@Entity()
export class Post {
    @PrimaryGeneratedColumn() id: number;
    @Column("longtext") text: string;
    @Column({ type: "text", nullable: true }) image: string;
    @Column({ type: "int", default: 0 }) commentsCount: number;
    @Column({ type: "int", default: 0 }) likesCount: number;
    @Column({ type: "text", default: "" }) latestLike: string;
    @CreateDateColumn() createdAt: Date;
    @Column({ type: "bool", default: false }) likedByAuthUser: boolean;

    @OneToOne(type => Comment, comment => comment.post, {onDelete: 'SET NULL'}) @JoinColumn() latestComment: Comment;
    @ManyToOne(type => User, user => user.posts, { onDelete: 'CASCADE'}) author: User;
    @OneToMany(type => Comment, comment => comment.post) comments: Comment[];
    @OneToMany(type => Like, like => like.post) likes: Like[];
}