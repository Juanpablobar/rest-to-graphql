const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql`
  type Characters {
    name: String
    url: String
  }

  type Character {
    id: ID
    name: String
    types: [String]
  }

  type Query {
    characters: [Characters]
    character(id: ID!): Character
  }
`;

  const resolvers = {
    Query: {
      characters: () => fetchCharacters(),
      character: (parent, args) => {
        const { id } = args
        return fetchCharacter({id})
      }
    }
  };

  const fetchCharacters = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.json())
            .then(json => json.results)

  }
  
  const fetchCharacter = ({ id }) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())

  }

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const characters = [
  {
    name: "Rick Sanchez",
    id: 1,
    status: "Alive",
    episodes: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2"
    ]
  },
  {
    name: "Morty Smith",
    id: 2,
    status: "Alive",
    episodes: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/3"
    ]
  }
];

const episodes = [
  {
    name: "Pilot",
    id: 1
  },
  {
    name: "Lawnmower Dog",
    id: 2
  }
];

function fetchEpisodes() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/episode/")
    .then(res => res.json())
    .then(json => json.results);
}

function fetchEpisodeById(id) {
  return fetch("https://rickandmortyapi.com/api/episode/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchEpisodeByUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacterById(id) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/character/" + id)
    .then(res => res.json())
    .then(json => json);
}

function fetchCharacterByUrl(url) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}
