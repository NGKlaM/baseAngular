import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductcardComponent } from '../../components/productcard/productcard.component';
import { ProductService } from '../../service/Product/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ProductcardComponent, NgFor,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productService = inject(ProductService);
  productList: any = [];
  ngOnInit(): void {
    this.productService
      .getProdut({ page: 0, size: 4 })
      .subscribe((product: any) => {
        return (this.productList = product.data);
      });
  }
}
