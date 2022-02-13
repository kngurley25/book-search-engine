const { AuthenticationError } = require("apollo-server-express");
const { sign } = require("jsonwebtoken");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v - password')
                    .populate('bookCount')
                    .populate('savedBooks')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            // const token = signToken(user);
            // return { token, user };
            return user;
        }
    }
};

module.exports = resolvers;