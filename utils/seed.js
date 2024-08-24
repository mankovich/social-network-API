const mongoose = require('mongoose');
const db = require('../models');
const { ObjectId } = require('mongoose').Types;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socNetDB');

const reactionSeed = [
    {
        _id: new ObjectId(),
        reactionBody: "hrrrumpff",
        username: "missKitty",
        createdAt: Date.now(),
    },
    {
        _id: new ObjectId(),
        reactionBody: "Bitter you will be less if you trust the force.",
        username: "felineMstrYoda",
        createdAt: Date.now(),
    },
    {
        _id: new ObjectId(),
        reactionBody: "Unwavering commitment to a schtick, appreciate and enjoy, I do",
        username: "felineMstrYoda",
        createdAt: Date.now(),
    },
    {
        _id: new ObjectId(),
        reactionBody: "You have my SINCEREST sympathies as I can only imagine how turbulent and taxing the life that you, a cat, must endure.",
        username: "sarcasticPanda",
        createdAt: Date.now(),
    },
    {
        _id: new ObjectId(),
        reactionBody: "I enthusiastically second that!",
        username: "missKitty",
        createdAt: Date.now(),
    }, 
    {
        _id: new ObjectId(),
        reactionBody: "Rats! A cat, a cat, a RAT!",
        username: "tacOcat",
        createdAt: Date.now(),
    }, 
    {
        _id: new ObjectId(),
        reactionBody: "Oh PLEASE DO little miss! I know how overworked and underappreciated you are!",
        username: "sarcasticPanda",
        createdAt: Date.now(),
    },
    {
        _id: new ObjectId(),
        reactionBody: "Yessir! As a rule! Are you SERIOUS?!?",
        username: "tacOcat",
        createdAt: Date.now(),
    }, 
    {
        _id: new ObjectId(),
        reactionBody: "Yes, well, I suppose you dimwits can be right about some things. Like a broken clock.",
        username: "grumpyCat",
        createdAt: Date.now(),
    },
];

const thoughtSeed = [
    {
        _id: new ObjectId(),
        thoughtText: "Very comfortable the cardboard boxes are. Take them away the hooman must not.",
        createdAt: Date.now(),
        username: 'felineMstrYoda',
        reactions: [reactionSeed[4]._id, reactionSeed[7]._id, reactionSeed[8]._id],
    },
    {
        _id: new ObjectId(),
        thoughtText: "Without question, cats are WAAAAAY more interesting and cuddly and amazing than pandas...",
        createdAt: Date.now(),
        username: 'sarcasticPanda',
        reactions: [],
    },
    {
        _id: new ObjectId(),
        thoughtText: "Rise, sir, oh sir, arise! Madam, I'm Adam! Was it a rat I saw? Never odd or even...",
        createdAt: Date.now(),
        username: 'tacOcat',
        reactions: [reactionSeed[2]._id],
    },
    {
        _id: new ObjectId(),
        thoughtText: "I think I'll just pretend to be asleep, so that my hooman doesn't ask me to do anything.",
        createdAt: Date.now(),
        username: 'missKitty',
        reactions: [reactionSeed[6]._id],
    },
    {
        _id: new ObjectId(),
        thoughtText: "If all the other things that move and make noise wouldn't bother, then I could finally catch up on my correspondence.",
        createdAt: Date.now(),
        username: 'grumpyCat',
        reactions: [reactionSeed[0]._id, reactionSeed[1]._id, reactionSeed[3]._id, reactionSeed[5]._id],
    },
];

const userSeed = [
    {
        _id: new ObjectId(),
        username: 'missKitty',
        email: 'kitty.cat@email.com',
        thoughts: [thoughtSeed[3]._id],
        friends: []
    }, 
    {
        _id: new ObjectId(),
        username: 'tacOcat',
        email: 'tacOcat@email.com',
        thoughts: [thoughtSeed[2]._id],
        friends: []
    }, 
    {
        _id: new ObjectId(),
        username: 'sarcasticPanda',
        email: 'iLoveYourZoos@email.com',
        thoughts: [thoughtSeed[1]._id],
        friends: []
    }, 
    {
        _id: new ObjectId(),
        username: 'grumpyCat',
        email: 'leave_meowlone@email.com',
        thoughts: [thoughtSeed[4]._id],
        friends: []
    }, 
    {
        _id: new ObjectId(),
        username: 'felineMstrYoda',
        email: 'awed.you.are@email.com',
        thoughts: [thoughtSeed[0]._id],
        friends: []
    }, 
];

userSeed[0].friends = [ 
    userSeed[1]._id, 
    userSeed[4]._id 
];

userSeed[1].friends = [ 
    userSeed[0]._id, 
    userSeed[2]._id, 
    userSeed[4]._id 
];

userSeed[2].friends = [ 
    userSeed[1]._id, 
    userSeed[4]._id 
];

userSeed[4].friends = [ 
    userSeed[1]._id, 
    userSeed[2]._id, 
    userSeed[0]._id 
];

async function seedDatabase() {
    try {
        await db.Thought.deleteMany({});
        const thoughtResult = await db.Thought.insertMany(thoughtSeed, reactionSeed);
        console.log(`==========\n\n${thoughtResult.length} thoughts seeded, with reactions\n\n==========`);

        await db.User.deleteMany({});
        const userResult = await db.User.insertMany(userSeed);
        console.log(`==========\n\n${userResult.length} users seeded\n\n==========`);

        process.exit(0);
    } catch (err) {
        console.log('\n\nXxXxXxXxX\n\nERROR seeding database\n\nXxXxXxXxX\n\n\n', err);

        process.exit(1);
    }
};

seedDatabase();