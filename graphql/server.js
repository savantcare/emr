const { ApolloServer, gql } = require("apollo-server");

const schema = gql(`
  type Query {
    currentUser: User
    postsByUser(userId: String!): [Post]
    postsByServiceStatement(userId: String!): [Post]
  }

  type User {
    id: ID!
    username: String!
    posts: [Post]
  }

  type serviceStatement {
    id: ID!
    content: String!
    userId: ID!
  }


  type Post {
    id: ID!
    content: String!
    userId: ID!
  }
`);

var data = {};

data.posts = [
  {
    id: "xyz-1",
    content: "First Post - Hello world",
    userId: "abc-1",
  },
];

data.serviceStatement = [
  {
    id: "xyz-1",
    content: "First Post - Hello world",
    userId: "abc-1",
  },
];

data.users = [
  {
    id: "abc-1",
    username: "andy25",
  },
];

const currentUserId = "abc-1";

var resolvers = {
  Query: {
    currentUser: (parent, args) => {
      let user = data.users.find((u) => u.id === currentUserId);
      let posts = data.posts.filter((p) => p.userId === currentUserId);
      // set posts as a property in user (immutable)
      user = Object.assign({}, user, {
        posts: posts,
      });
      return user;
    },
    postsByUser: (parent, args) => {
      let posts = data.posts.filter((p) => p.userId === args.userId);
      return posts;
    },
    postsByServiceStatement: (parent, args) => {
      let serviceStatement = data.serviceStatement.filter(
        (p) => p.userId === args.userId
      );
      return serviceStatement;
    },
  },
};

// NEW
User: {
  posts: (parent, args) => {
    let posts = data.posts.filter((p) => p.userId === parent.id);
    return posts;
  };
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

server.listen(4001).then(({ url }) => {
  console.log("API server running at localhost:4001");
});
