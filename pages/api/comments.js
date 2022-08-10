import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI =
  "https://api-us-west-2.hygraph.com/v2/cl67aw91fccgg01uk6n921baw/master";

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjAxNTcyNzYsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w2N2F3OTFmY2NnZzAxdWs2bjkyMWJhdy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzQxNDVlYzItMTk4Ni00NGNjLTlhYWYtYjRmZTllMjFlOGU2IiwianRpIjoiY2w2bnlzMHZhMGloaDAxdXBmMnhlMXc1biJ9.PrpVE1MFkoeyeSzaoZYK3kUoa30X80Z4o3nHe-YTzq6jliAkZ6eP4lDQZS6YrSuvDCFkgu_nb2o8cQx4a3DW1xiP1G1Q2LUwe09x7IzcA0spEoOyS4R1xxk2L6-hn_-MShy5PMNickA0GRgZdT8tYv0f6gOkhbX4vTcPXDCHuzVyGFUkgFY3F7sQ75Y1xSGOqq2c6qzNUEv9Pr3fr5ZfK_8bqST3oQxX7kEOYdkpeTIiEvWfOHfZFd5tozytHHMMMk0AsZoqVUZNsgLyilyvfGwBShGxFSrSGOu4_svm0RMzM2JPkHIQK4fE9fWG9tPArytNNyqkVM-JV9XitjUBXA-2UHMIfNaTdP11uOebDIDMijlsgcWPY1VYIxSOf5Bp-axiR7vtOGtq9b9kfG4bODGEr5avHp3jSTCNi3fEvYoGDbBfD3EfrnlUmLzR12aKHhSXsocqhtzDqmvyRb-tI_uniqxnNL4aozpYRKi0aKv6kyTip2P2p8UdDVGXfQGVZ6ivjBWjPAN62XtaNsJeWdGIMXZrsUjmpD_z0j38iz2Q88ro4KOxdur_BD4cDAbUtYPX2C5r9YcSK_Cf1bZUx7ZQBsKuO0es5vXA8-aD3lKcJ7MJ73UmtH9hLk9h3fRYCT2j0T85dBeSQ-A95H0A2DynzGbylUVHzlfMosZfofM"}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}
