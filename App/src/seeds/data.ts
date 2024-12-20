const users = [
    {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        friends: [],
    },
    {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        friends: [],
    },
    {
        username: 'alice_jones',
        email: 'alice.jones@example.com',
        password: 'password123',
        friends: [],
    },
];

const posts = [
    {
        userId: 1,
        content: 'Hello, world!',
        createdAt: new Date(),
    },
    {
        userId: 2,
        content: 'Just joined this awesome network!',
        createdAt: new Date(),
    },
    {
        userId: 3,
        content: 'Good morning everyone!',
        createdAt: new Date(),
    },
];

const comments = [
    {
        postId: 1,
        userId: 2,
        content: 'Welcome to the network!',
        createdAt: new Date(),
    },
    {
        postId: 2,
        userId: 1,
        content: 'Thank you!',
        createdAt: new Date(),
    },
    {
        postId: 3,
        userId: 2,
        content: 'Good morning!',
        createdAt: new Date(),
    },
];

export { users, posts, comments };