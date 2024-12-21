import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
const seedDatabase = async () => {
    try {
        await db();
        await cleanDB();
        // Create empty array to hold the users
        const users = [];
        // Loop 3 times -- add users to the users array
        for (let i = 0; i < 3; i++) {
            const username = `user${i}`;
            const email = `${username}@gmail.com`;
            // Create empty array to hold the thoughts
            const thoughts = [];
            // Loop 3 times -- add thoughts to the thoughts array
            for (let j = 0; j < 3; j++) {
                const thoughtText = `Thought ${j}`;
                const thoughtReactions = [];
                // Loop 3 times -- add reactions to the reactions array
                for (let k = 0; k < 3; k++) {
                    const reactionBody = `Reaction ${k}`;
                    const reactionUsername = `user${k}`;
                    thoughtReactions.push({ reactionBody, username: reactionUsername });
                }
                // Create a new Thought document
                const thought = await Thought.create({
                    thoughtText,
                    username,
                    reactions: thoughtReactions,
                });
                // Add the Thought's ObjectId to the thoughts array
                thoughts.push(thought._id);
            }
            // Add the user with the thoughts array
            users.push({ username, email, thoughts });
        }
        // Insert the users into the database
        await User.insertMany(users);
        console.log('Database seeded');
        process.exit(0);
    }
    catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};
seedDatabase();
