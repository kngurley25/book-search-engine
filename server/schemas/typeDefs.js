const { gql } = require('apollo-server-express');

//add image and link to book
const typeDefs = gql`
    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): User
        saveBook(content: bookDetails): User
        removeBook(bookId: String): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input bookDetails {
        authors: [String]
        description: String
        bookId: Int
        image: String
        link: String
    }
`;

module.exports = typeDefs;