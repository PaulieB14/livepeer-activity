// src/app/page.tsx
"use client"; // Add this line at the top

import { useQuery } from "@apollo/client";
import client from "../../lib/apolloClient";
import { GET_BROADCASTERS } from "../../lib/queries";
import { ApolloProvider } from "@apollo/client";

const Page = () => {
  const { loading, error, data } = useQuery(GET_BROADCASTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Broadcasters</h1>
      <ul>
        {data.broadcasters.map((broadcaster: any) => (
          <li key={broadcaster.id}>
            ID: {broadcaster.id}, Deposit: {broadcaster.deposit}, Reserve: {broadcaster.reserve}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrap the component with ApolloProvider here
const WrappedPage = () => (
  <ApolloProvider client={client}>
    <Page />
  </ApolloProvider>
);

export default WrappedPage;
