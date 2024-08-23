const mongoose = require('mongoose');
const db = require('../models');
const { ObjectId } = require('mongoose').Types;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socNetDB');

const reactionSeed = [
    {
        reactionId: new ObjectId(),
        reactionBody: "hrrrumpff",
        username: "missKitty",
        createdAt: Date.now,
    },
    {
        reactionId: new ObjectId(),
        reactionBody: "Bitter you will be less if you trust the force.",
        username: "felineMstrYoda",
        createdAt: Date.now,
    },
    {
        reactionId: new ObjectId(),
        reactionBody: "Unwavering commitment to a schtick, appreciate and enjoy, I do",
        username: "felineMstrYoda",
        createdAt: Date.now,
    },
    {
        reactionId: new ObjectId(),
        reactionBody: "You have my SINCEREST sympathies as I can only imagine how turbulent and taxing the life that you, a cat, must endure.",
        username: "sarcasticPanda",
        createdAt: Date.now,
    },
    {
        reactionId: new ObjectId(),
        reactionBody: "I enthusiastically second that!",
        username: "missKitty",
        createdAt: Date.now,
    }, 
    {
        reactionId: new ObjectId(),
        reactionBody: "Rats! A cat, a cat, a RAT!",
        username: "tacOcat",
        createdAt: Date.now,
    }, 
    {
        reactionId: new ObjectId(),
        reactionBody: "Oh PLEASE DO little miss! I know how overworked and underappreciated you are!",
        username: "sarcasticPanda",
        createdAt: Date.now,
    },
    {
        reactionId: new ObjectId(),
        reactionBody: "Yessir! As a rule! Are you SERIOUS?!?",
        username: "tacOcat",
        createdAt: Date.now,
    }, 
    {
        reactionId: new ObjectId(),
        reactionBody: "Yes, well, I suppose you dimwits can be right about some things. Like a broken clock.",
        username: "grumpyCat",
        createdAt: Date.now,
    },
];

const thoughtSeed = [
    {
        _id: new ObjectId(),
        thoughtText: "Very comfortable the cardboard boxes are. Take them away the hooman must not.",
        createdAt: Date.now,
        _username: 'felineMstrYoda',
        reactions: [reactionSeed[4].reactionId, reactionSeed[7].reactionId, reactionSeed[8].reactionId],
    },
    {
        _id: new ObjectId(),
        thoughtText: "Without question, cats are WAAAAAY more interesting and cuddly and amazing than pandas...",
        createdAt: Date.now,
        _username: 'sarcasticPanda',
        reactions: [],
    },
    {
        _id: new ObjectId(),
        thoughtText: "Rise, sir, oh sir, arise! Madam, I'm Adam! Was it a rat I saw? Never odd or even...",
        createdAt: Date.now,
        _username: 'tacOcat',
        reactions: [reactionSeed[2].reactionId],
    },
    {
        _id: new ObjectId(),
        thoughtText: "I think I'll just pretend to be asleep, so that my hooman doesn't ask me to do anything.",
        createdAt: Date.now,
        _username: 'missKitty',
        reactions: [reactionSeed[6].reactionId],
    },
    {
        _id: new ObjectId(),
        thoughtText: "If all the other things that move and make noise wouldn't bother, then I could finally catch up on my correspondence.",
        createdAt: Date.now,
        _username: 'grumpyCat',
        reactions: [reactionSeed[0].reactionId, reactionSeed[1].reactionId, reactionSeed[3].reactionId, reactionSeed[5].reactionId],
    },
];

const userSeed = [
    {
        _id: new ObjectId(),
        username: 'missKitty',
        email: 'kitty.cat@email.com',
        thoughts: [thoughtSeed[3]._id],
        friends: [this[1]._id, this[4]._id]
    }, 
    {
        _id: new ObjectId(),
        username: 'tacOcat',
        email: 'tacOcat@email.com',
        thoughts: [thoughtSeed[2]._id],
        friends: [this[0]._id, this[2]._id, this[4]._id]
    }, 
    {
        _id: new ObjectId(),
        username: 'sarcasticPanda',
        email: 'iLoveYourZoos@email.com',
        thoughts: [thoughtSeed[1]._id],
        friends: [this[1]._id, this[4]._id]
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
        friends: [this[2]._id, this[0]._id, this[1]._id]
    }, 
];

async function seedDatabase() {
    try {
        await db.Thought.deleteMany({});
        const thoughtResult = await db.Thought.insertMany(thoughtSeed, reactionSeed);
        console.log(thoughtResult.length, "==========\n\nthoughts (and reactions) seeded\n\n==========");

        await db.User.deleteMany({});
        const userResult = await db.User.insertMany(userSeed);
        console.log(userResult.length, "==========\n\nusers seeded\n\n==========");

        process.exit(0);
    } catch (err) {
        console.log('XxXxXxXxX\n\nERROR seeding database\n\nXxXxXxXxX', err);

        process.exit(1);
    }
};

seedDatabase();