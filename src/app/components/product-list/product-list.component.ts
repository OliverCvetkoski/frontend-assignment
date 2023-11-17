import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/graphql/graphql.interfaces';
import {
  ALL_PRODUCTS,
  SORT_BY_ASCENDING,
  SORT_BY_DESCENDING,
  getFilteredResults,
} from 'src/app/graphql/graphql.queries';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = false;
  error: any;
  resultSubscription = new Subscription();
  routeSubscription = new Subscription();
  searchTerm = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  sortProducts(e: any) {
    this.loading = true;
    console.log('Sorting: Loading set to', this.loading);

    const sortOrder = e?.target?.value || '';
    const query =
      sortOrder === 'ascending'
        ? SORT_BY_ASCENDING
        : sortOrder === 'descending'
        ? SORT_BY_DESCENDING
        : ALL_PRODUCTS;

    this.resultSubscription = this.apollo
      .watchQuery({ query })
      .valueChanges.subscribe((result: any) => {
        this.products = result.data.products.items;
        this.loading = false;
        console.log('Sorting: Loading set to', this.loading);
      });
  }

  filterResults(e?: Event) {
    if (this.searchTerm !== '') {
      this.loading = true;
      console.log('Filtering: Loading set to', this.loading);

      this.resultSubscription = this.apollo
        .watchQuery({ query: getFilteredResults(this.searchTerm) })
        .valueChanges.subscribe((result: any) => {
          this.products = result.data.products.items;
          this.loading = false;
          console.log('Filtering: Loading set to', this.loading);
        });
      this.updateUrlParams({ search: this.searchTerm });
    }
  }

  private updateUrlParams(params: any): void {
    this.loading = true;
    console.log('Update URL: Loading set to', this.loading);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit: Loading set to', this.loading);
    this.loading = true;

    this.routeSubscription = this.route.queryParams.subscribe(({ search }) => {
      if (search) {
        this.searchTerm = search;
        console.log('Calling filterResults from ngOnInit');
        this.filterResults();
      } else {
        this.resultSubscription = this.apollo
          .watchQuery({ query: ALL_PRODUCTS })
          .valueChanges.subscribe((result: any) => {
            this.products = result.data.products.items;
            this.searchTerm = '';
            this.loading = false;
            console.log('ngOnInit: Loading set to', this.loading);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
