// src/app/page.tsx
import { useQuery, ApolloProvider } from "@apollo/client";
import client from "../../lib/apolloClient";
import { GET_BROADCASTERS } from "../../lib/queries";

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
