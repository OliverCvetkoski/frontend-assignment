import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ALL_PRODUCTS,
  GET_COLLECTION_PRODUCTS,
  GET_FILTERED_RESULTS,
  GET_SORTED_PRODUCTS,
} from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getAllProducts() {
    return this.apollo.watchQuery({ query: ALL_PRODUCTS }).valueChanges;
  }

  getCollectionProducts(slug: string) {
    return this.apollo.watchQuery({
      query: GET_COLLECTION_PRODUCTS,
      variables: {
        slug: slug,
        skip: 0,
        take: 10,
      },
    }).valueChanges;
  }

  getSortedProducts(sortOrder: string) {
    return this.apollo.watchQuery({
      query: GET_SORTED_PRODUCTS,
      variables: { sortOrder: sortOrder.toUpperCase() },
    }).valueChanges;
  }

  getFilteredResults(searchTerm: string) {
    return this.apollo.watchQuery({
      query: GET_FILTERED_RESULTS,
      variables: { searchTerm: searchTerm },
    }).valueChanges;
  }
}
