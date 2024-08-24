const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .select('-__v')
            .populate({ path: 'reactions', select: '-__v' });

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')
            .select( '-__v' )

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
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
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
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'We cannot locate any thoughts with that ID :( ' });
            }

            res.json({ message: 'the thought has been deleted' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID. Try again' });
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
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