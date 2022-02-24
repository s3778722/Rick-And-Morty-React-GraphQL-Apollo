import { gql } from "apollo-boost";

export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters(
    $page: Int
    $name: String
    $gender: String
    $species: String
    $status: String
    $type: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        gender: $gender
        species: $species
        status: $status
        type: $type
      }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
        }
        location {
          name
        }
        episode {
          episode
        }
      }
    }
  }
`;

export const GET_CHARACTER =  gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      episode {
        name
        episode
        air_date
      }
      created
    }
  }
`;
