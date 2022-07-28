import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

type Data = {
  name: string
}

export default async function comments(
  req: NextApiRequest,
  res
) {
  //Autenticate to graphCMS

  //try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
      }
    });
  /*} catch(err) {
    console.log(err);
  }*/

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
    }
  `;


  const result = await graphQLClient.request(query, req.body)

  res.status(200).send(result);
}
