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
  selectedPriceId: number | null = null;
  product: Product = {} as Product;
  loading = false;
  quantityValue: number = 1;
  productsInLocalStorage: any[] = [];
  showNotification = false;

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
      });

    const storedProducts = localStorage.getItem('products');
    this.productsInLocalStorage =
      storedProducts !== null ? JSON.parse(storedProducts) : [];
  }

  addItemToCart() {
    if (!this.selectedPriceId) {
      return;
    }

    this.apollo
      .mutate({
        mutation: ADD_ITEM_TO_ORDER,
        variables: {
          productVariantId: this.selectedPriceId,
          quantity: this.quantityValue,
        },
      })
      .subscribe((result: any) => {
        const { lines, totalQuantity } = result.data.addItemToOrder;
        const { sku, price } = lines[0].productVariant;
        const image = lines[0].featuredAsset.preview;
        const name = lines[0].productVariant.name;

        const newProduct = {
          sku,
          image,
          name,
          quantity: totalQuantity,
          price: price * totalQuantity,
          originalPrice: price,
        };

        if (this.productsInLocalStorage) {
          const existingProductIndex = this.productsInLocalStorage.findIndex(
            (product: any) => product.sku === sku
          );

          if (existingProductIndex !== -1) {
            this.productsInLocalStorage[existingProductIndex].quantity +=
              this.quantityValue;
            this.productsInLocalStorage[existingProductIndex].price +=
              price * this.quantityValue;
          } else {
            this.productsInLocalStorage.push(newProduct);
          }
        } else {
          this.productsInLocalStorage = [newProduct];
        }

        localStorage.setItem(
          'products',
          JSON.stringify(this.productsInLocalStorage)
        );
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      });
  }
}
