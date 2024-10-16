// lib/queries.ts
import { gql } from "@apollo/client";

export const GET_BROADCASTERS = gql`
  query GetBroadcasters {
    broadcasters {
      id
      deposit
      reserve
    }
  }
`;
