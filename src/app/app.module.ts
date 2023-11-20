import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { GraphQLModule } from './graphql.module';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FilteredResultsComponent } from './components/filtered-results/filtered-results.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    CartComponent,
    HomepageComponent,
    LoadingSpinnerComponent,
    ProductDetailComponent,
    NotificationComponent,
    FilteredResultsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
