const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')
                // .populate({ path: 'thoughts', select: '-__v' })
                // .populate({ path: 'friends', select: '-__v' });

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {

        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user and their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json({ message: 'The user and any of their thoughts have been deleted' })

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //add a friend to a user's friends array
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId} ,
                { $addToSet: { friends: {_id: req.body.friendId } } },
                { new: true } 
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'There is no user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //remove a friend from a user's friends array
    async removeFriend(req, res) {
        try {
            // console.log("++++++\n\nwe hit the route\n\n++++++++")
            const friend = await User.findById(req.params.friendId)
            // console.log(`\n\n++++++\n1st CL req.params: ${req.params.friendId} while the friend object returned by the query is this correctly returned fellow: ${friend}\n\+++++++`)
            if (!friend) {
                return res.status(404).json({ message: 'There is no user with that ID...whomever you are breaking up with must have a different ID' })
            };
            // console.log(`\n\n++++++\n2nd ${req.params.friendId} and ${friend}\n\+++++++`)
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true } 
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};