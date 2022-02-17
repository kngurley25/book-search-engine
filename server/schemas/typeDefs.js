const { gql } = require('apollo-server-express');

//add image and link to book
const typeDefs = gql`
    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: bookDetails): User
        removeBook(bookId: ID): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
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
        title: String
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
    }
`;

module.exports = typeDefs;