import { gql } from 'apollo-angular';

export const ALL_PRODUCTS = gql`
  query {
    products(options: { take: 54 }) {
      items {
        id
        slug
        name
        variants {
          name
          id
          price
          stockLevel
        }
        featuredAsset {
          preview
        }
      }
    }
  }
`;

export const SORT_BY_ASCENDING = gql`
  query {
    products(options: { take: 54, sort: { name: ASC } }) {
      items {
        id
        name
        slug
        variants {
          name
          id
          price
          stockLevel
        }
        featuredAsset {
          preview
        }
      }
    }
  }
`;

export const SORT_BY_DESCENDING = gql`
  query {
    products(options: { take: 54, sort: { name: DESC } }) {
      items {
        id
        name
        slug
        variants {
          name
          id
          price
          stockLevel
        }
        featuredAsset {
          preview
        }
      }
    }
  }
`;

export function getFilteredResults(searchTerm: string | number) {
  return gql`
query {
  products(options: { filter: { name: { contains: "${searchTerm}" } }, take: 10 }) {
    items {
      id
      name
      slug
      variants {
        name
        id
        price
        stockLevel
      }
      featuredAsset {
        preview
      }
    }
  }
}
`;
}

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetail($id: ID!) {
    product(id: $id) {
      id
      name
      featuredAsset {
        preview
      }
      variants {
        price
        name
      }
      description
    }
  }
`;
