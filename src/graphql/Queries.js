import { gql } from "apollo-boost";

const GET_ALL_CHARACTERS = gql`
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


export default GET_ALL_CHARACTERS;
