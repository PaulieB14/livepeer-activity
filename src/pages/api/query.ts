// src/pages/api/query.ts
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { query } = req.body;

    const client = new ApolloClient({
      uri: `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/FE63YgkzcpVocxdCEyEYbvjYqEf2kb1A6daMYRxmejYC`,
      cache: new InMemoryCache(),
    });

    try {
      const result = await client.query({
        query: gql(query),
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
