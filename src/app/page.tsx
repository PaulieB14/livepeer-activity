// pages/page.tsx
import { useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import { GET_BROADCASTERS } from "../lib/queries";

const Page = () => {
  // Use the Apollo `useQuery` hook to execute the query
  const { loading, error, data } = useQuery(GET_BROADCASTERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Livepeer Broadcasters</h1>
      <ul>
        {data.broadcasters.map((broadcaster: any) => (
          <li key={broadcaster.id}>
            <p><strong>Broadcaster ID:</strong> {broadcaster.id}</p>
            <p><strong>Deposit:</strong> {broadcaster.deposit}</p>
            <p><strong>Reserve:</strong> {broadcaster.reserve}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
