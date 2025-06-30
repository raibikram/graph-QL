import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { configDotenv } from "dotenv";
import { API } from "./utils/api";

configDotenv();

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

const typeDefs = `
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }

  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUserById(id: ID!): User
  }
`;

const resolvers = {
  Todo: {
    user: async (todo: Todo): Promise<User> => {
      console.log("Todo received in user resolver:", todo); // debug
      const { data } = await API.get<User>(`/users/${todo.userId}`);
      return data;
    },
  },
  Query: {
    getTodos: async (): Promise<Todo[]> => {
      const { data } = await API.get<Todo[]>("/todos");
      return data;
    },
    getAllUsers: async (): Promise<User[]> => {
      const { data } = await API.get<User[]>("/users");
      return data;
    },
    getUserById: async (_parent: any, args: { id: number }): Promise<User> => {
      const { data } = await API.get<User>(`/users/${args.id}`);
      return data;
    },
  },
};

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
