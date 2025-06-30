"use client";
import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  user?: User; // optional because user may be undefined before data loads
};

const GET_TODOS_WITH_USER = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;
export default function Home() {
  const { loading, error, data } = useQuery(GET_TODOS_WITH_USER);

  if (loading) {
    <h1>Loading...</h1>;
  }
  if (error) return <h1>Error: {error.message}</h1>;
  // console.log("data", data?.getTodos && data.getTodos);
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>User Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getTodos &&
              data?.getTodos?.slice(0, 50).map((todo: Todo, index: number) => (
                <TableRow key={todo.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.user?.name ?? "N/A"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
