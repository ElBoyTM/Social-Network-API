import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
try {
    await db();
    await cleanDB();
    // Create empty array to hold the users
    const users = [];
    // Loop 3 times -- add users to the users array
    for (let i = 0; i < 3; i++) {
        const username = `user${i}`;
        const email = `${username}@gmail.com`;
        const thoughts = [];
        // Loop 3 times -- add thoughts to the thoughts array
        for (let j = 0; j < 3; j++) {
            const thoughtText = `Thought ${j}`;
            const thoughtReactions = [];
            // Loop 3 times -- add reactions to the reactions array
            for (let k = 0; k < 3; k++) {
                const reactionBody = `Reaction ${k}`;
                const reactionUsername = `user${k}`;
                thoughtReactions.push({ reactionBody, reactionUsername });
            }
            thoughts.push({ thoughtText, thoughtReactions });
        }
        users.push({ username, email, thoughts });
    }
    // Add users to the collection and await the results
    const userData = await User.create(users);
    // Add thoughts to the collection and await the results
    await Thought.create({
        thoughtText: 'Thought 1',
        username: userData[0].username,
        reactions: [{ reactionBody: 'Reaction 1', reactionUsername: userData[1].username }],
    });
    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
