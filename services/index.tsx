import { request, gql } from 'graphql-request';

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export const getPosts = async () => {
  const query: string = gql`
    query MyQuery {
      postsConnection(
        orderBy: createdAt_DESC
      ) {
        edges {
          node {
            createdAt
            slug
            excerpt
            title
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

/*
I'm not sure if this query is correct and might be use to get the next posts (pagination)

export const getNextPosts = async (createdAt) => {
  const query = gql`
    query GetNextPosts($createdAt: DateTime!) {
      postsConnection(
        orderBy: createdAt_DESC
        first: 10
        where: { createdAt_lt: $createdAt}
      ) {
        edges {
          node {
            createdAt
            slug
            excerpt
            title
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { createdAt });
  return result.postsConnection.edges;
};
*/

export const getPostDetails = async (slug: string) => {
  const query: string = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getRecentPosts = async () => {
  const query: string = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
}


export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query: string = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: {slug_in: $categories} } }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { categories, slug } );
  return result.posts;
};

export const getFeaturedPosts = async () => {
  const query: string = gql`
    query GetFeaturedPosts {
      posts(
        where : { featuredPost: true }
      ) {
        author {
          name
          photo {
            url
          }
        }
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getCategories = async () => {
  const query: string = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
}

export const getCategoryPost = async (slug: string) => {
  const query: string = gql`
    query GetCategoryPost($slug: String!) {
       posts(where: {categories_some: {slug: $slug}}) {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.posts;
}

export const submitComment = async (obj: any) => {
  const result: any = await fetch('/api/comments', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });

  return result.json();
}

export const getComments = async (slug: string) => {
  const query: string = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.comments; 
}
