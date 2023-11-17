import { gql } from 'apollo-angular';

export function addItemToOrder() {
  return gql`
    mutation ($id: Int!, $quantity: Int!) {
      addItemToOrder(productVariantId: $id, quantity: $quantity) {
        ... on Order {
          id
          totalQuantity
          subTotal
          shipping
          total
        }
      }
    }
  `;
}
