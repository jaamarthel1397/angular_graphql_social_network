import casual from 'casual';

const mocks = {
    User: () => ({
        id: casual.uuid, 
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
        id: casual.uuid,
        text: casual.text,
        image: 'https://picsum.photos/seed/picsum/200/300',
        commentsCount: () => casual.integer(0),
        likesCount: () => casual.integer(0),
        latestLike: casual.first_name,
        createdAt: () => casual.date()
    }),

    Comment: () => ({
        id: casual.uuid,
        comment: casual.text,
        post: casual.uuid,
        createdAt: () => casual.date()
    }),

    Like: () => ({
        id: casual.uuid,
        post: casual.uuid
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