import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor() {}
  productsInLocalStorage: any;
  showNotification = false;

  updateQuantity(product: any, newQuantity: number) {
    product.quantity = newQuantity;
    const existingProductIndex = this.productsInLocalStorage.findIndex(
      (result: any) => result.sku === product.sku
    );

    if (existingProductIndex !== -1) {
      const oldQuantity =
        this.productsInLocalStorage[existingProductIndex].quantity;

      if (newQuantity < oldQuantity) {
        product.quantity = newQuantity;
        product.price = product.originalPrice * newQuantity;

        this.productsInLocalStorage[existingProductIndex] = product;
      } else {
        product.quantity = newQuantity;
        product.price = product.originalPrice * newQuantity;

        this.productsInLocalStorage[existingProductIndex] = product;
      }
    }

    localStorage.setItem(
      'products',
      JSON.stringify(this.productsInLocalStorage)
    );
  }

  deleteProduct(product: any) {
    const indexToDelete = this.productsInLocalStorage.findIndex(
      (result: any) => result.sku === product.sku
    );

    if (indexToDelete !== -1) {
      this.productsInLocalStorage.splice(indexToDelete, 1);
      localStorage.setItem(
        'products',
        JSON.stringify(this.productsInLocalStorage)
      );
    }
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }

  ngOnInit(): void {
    const storedProducts = localStorage.getItem('products');
    this.productsInLocalStorage =
      storedProducts !== null ? JSON.parse(storedProducts) : [];
  }
}
