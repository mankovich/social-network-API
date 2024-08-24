const { User, Thought } = require('../models');

module.exports = {

    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .select('-__v')
            // .populate({ path: 'reactions', select: '-__v' });

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate( { path: 'reactions', select: '-__v' } )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            //add to thinking user's thoughts array
            const thinker = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!thinker) {
                return res.status(404).json( { message: 'there is no user with that ID would could have thought that thought' } )
            }
            
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'We cannot locate any thoughts with that ID :( ' });
            };

            const unthinker = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!unthinker) {
                return res.status(404).json({ message: `There is no user with the username you supplied, so the deleted thought was not removed from their or anybody else's array` })
            }

            res.json({ message: 'the thought has been deleted' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            
            if (!thought) {
                return res.status(404).json({ message: 'There is no thought to be reacted to that has that ID.' });
            }
            
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'There is no thought with that ID, silly' });
            }

            res.json( { message: 'the reaction has been deleted' } )
        } catch (err) {
            res.status(500).json(err);
        }
    },
};