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

export const GET_SORTED_PRODUCTS = gql`
  query GetSortedProducts($sortOrder: SortOrder) {
    products(options: { take: 54, sort: { name: $sortOrder } }) {
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

export const GET_FILTERED_RESULTS = gql`
  query GetFilteredResults($searchTerm: String!) {
    products(
      options: { filter: { name: { contains: $searchTerm } }, take: 10 }
    ) {
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

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetail($id: ID!) {
    product(id: $id) {
      id
      name
      featuredAsset {
        preview
      }
      variants {
        id
        price
        name
      }
      description
    }
  }
`;

export const GET_COLLECTION_PRODUCTS = gql`
  query GetCollectionProducts($slug: String!, $skip: Int!, $take: Int!) {
    collection(slug: $slug) {
      id
      name
      description
      featuredAsset {
        id
        preview
      }
    }
    search(
      input: {
        collectionSlug: $slug
        groupByProduct: true
        skip: $skip
        take: $take
      }
    ) {
      totalItems
      items {
        productName
        slug
        productAsset {
          id
          preview
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        currencyCode
      }
    }
  }
`;
