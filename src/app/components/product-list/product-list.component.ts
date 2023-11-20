import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/graphql/graphql.interfaces';
import { ProductService } from 'src/app/services/product.service';

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
  filteredProducts: any;
  collection: any;
  isFiltered = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  filterByCollection(slug: string) {
    this.loading = true;
    this.productService.getCollectionProducts(slug).subscribe((result: any) => {
      this.filteredProducts = result.data.search.items;
      this.collection = result.data.collection.name;
      this.isFiltered = true;
      this.loading = false;
    });
    this.updateUrlParams({ collection: slug });
  }

  sortProducts(e: any) {
    this.loading = true;
    const sortOrder = e?.target?.value || '';
    if (sortOrder === '') {
      this.loadAllProducts();
    } else {
      this.resultSubscription = this.productService
        .getSortedProducts(sortOrder)
        .subscribe((result: any) => {
          this.products = result.data.products.items;
          this.loading = false;
        });
    }
  }

  searchProducts() {
    if (this.searchTerm !== '') {
      this.loading = true;
      this.resultSubscription = this.productService
        .getFilteredResults(this.searchTerm)
        .subscribe((result: any) => {
          this.products = result.data.products.items;
          this.loading = false;
        });
      this.updateUrlParams({ search: this.searchTerm });
    }
  }

  private updateUrlParams(params: any): void {
    this.loading = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.routeSubscription = this.route.queryParams.subscribe(
      ({ search, collection }) => {
        if (search) {
          this.searchTerm = search;
          this.searchProducts();
        } else if (collection) {
          this.filterByCollection(collection);
        } else {
          this.resetFilterState();
          this.loadAllProducts();
        }
      }
    );
  }

  private loadAllProducts(): void {
    this.loading = true;
    this.resultSubscription = this.productService
      .getAllProducts()
      .subscribe((result: any) => {
        this.products = result.data.products.items;
        this.searchTerm = '';
        this.loading = false;
      });
  }

  private resetFilterState(): void {
    this.products = [];
    this.filteredProducts = null;
    this.collection = null;
    this.isFiltered = false;
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
