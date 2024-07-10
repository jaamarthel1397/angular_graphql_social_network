import casual from 'casual';

let postsIds: string[] = [];
let usersIds: string[] = [];
const mocks = {
    User: () => ({
        id: () => {
          let uuid = casual.uuid;
          usersIds.push(uuid);
          return uuid;
        }, 
        fullName: casual.full_name,
        bio: casual.text,
        email: casual.email,
        username: casual.username,
        password: casual.password,
        image: 'https://picsum.photos/seed/picsum/200/300',
        coverImage: 
          'https://picsum.photos/seed/picsum/200/300',
        postsCount: () => casual.integer(0)
      }),

    Post: () => ({
        id: () => {
          let uuid = casual.uuid;
          postsIds.push(uuid);
          return uuid;
        },
        text: casual.text,
        image: 'https://picsum.photos/seed/picsum/200/300',
        commentsCount: () => casual.integer(0),
        likesCount: () => casual.integer(0),
        latestLike: casual.first_name,
        createdAt: () => casual.date(),
        author: casual.random_element(usersIds),
    }),

    Comment: () => ({
        id: casual.uuid,
        comment: casual.text,
        post: casual.random_element(postsIds),
        createdAt: () => casual.date(),
        author: casual.random_element(usersIds),
    }),

    Like: () => ({
        id: casual.uuid,
        post: casual.random_element(postsIds),
        user: casual.random_element(usersIds),
    }),

    Query: () =>({
        getPostsByUserId: () => 
          [...new Array(casual.integer(10, 100))],
        getFeed: () => [...new Array(casual.integer(10, 100))],
        getNotificationsByUserId: () => 
          [...new Array(casual.integer(10, 100))],
        getCommentsByPostId: () => 
          [...new Array(casual.integer(10, 100))],
        getLikesByPostId: () =>
          [...new Array(casual.integer(10, 100))],
        searchUsers: () =>
          [...new Array(casual.integer(10, 100))]
      })
}

export default mocks;