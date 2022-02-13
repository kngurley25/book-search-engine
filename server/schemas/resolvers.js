const resolvers = {
    Query: {
        helloworld: () => {
            return 'hello world!';
        }
    }
};

module.exports = resolvers;