import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GET_PRODUCT_DETAILS } from 'src/app/graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { ADD_ITEM_TO_ORDER } from 'src/app/graphql/graphql.fragment';

interface Product {
  id: number;
  name: string;
  description: string;
  featuredAsset: {
    preview: string;
  };
  variants: [
    {
      name: string;
      id: number;
      price: string;
    }
  ];
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  selectedPriceId: number = 1;
  product: Product = {} as Product;
  loading = false;
  quantityValue: number = 1;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.apollo
      .watchQuery({
        query: GET_PRODUCT_DETAILS,
        variables: { id: productId },
      })
      .valueChanges.subscribe((result: any) => {
        this.product = result.data.product;
        this.loading = !this.loading;
        console.log(result);
      });
  }

  addItemToCart() {
    this.apollo
      .mutate({
        mutation: ADD_ITEM_TO_ORDER,
        variables: {
          productVariantId: this.selectedPriceId,
          quantity: this.quantityValue,
        },
      })
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
