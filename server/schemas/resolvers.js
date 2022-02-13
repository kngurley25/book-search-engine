const { User, Book } = require("../models");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v - password')
                    .populate('bookCount')
                    .populate('savedBooks')
            }
        }
    }
};

module.exports = resolvers;