import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollerModule } from 'primeng/scroller';
import {
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { ProductService } from '../../../service/Product/product.service';
import { CategoryService } from '../../../service/Category/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    ToastModule,
    ConfirmDialogModule,
    PaginatorModule,
    NgIf,
    ScrollerModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProductsComponent {
  productList: any = [];
  userForm: FormGroup;
  first1: number = 0;
  count: number = 0;  
  rows1: number = 4;
  previousSearchTerm: string = '';
  checkData: boolean = false;
  cities!: any[];
  selectedCities!: any[];
  form = new FormGroup({
    selectedCities: new FormControl([]),
  });

  searchControl = new FormControl();
  serachDebouce: any = [];
  modalSearchDebouce: boolean = false;
  loading = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){
    this.userForm = this.formBuilder.group({
      search: [''],
    });
    this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe((results) =>{
      if (results.status === 1) {
        this.serachDebouce = [];
        this.loading = false;
      }else {
        this.loading = false;
        this.serachDebouce = results.data;
      }
    });
  }

  addProduct() {
    return this.router.navigate(['/admin/create']);
  }
  getAll(check?: any){
    const id = this.route.snapshot.queryParamMap.get('id');

    if(id) {
      this.productService
      .getCategoryProduct({id: id, page: this.first1, size: 4})
      .subscribe((product: any) => {
        this.count = product.count;
        this.form = new FormGroup({
          selectedCities: new FormControl<any>([
            {name: product.data[0].categoryId.name, code: id},
          ]),
        });
        return (this.productList = product.data);
      });
    }else {
      this.productService
      .getProdut({page: check? check : this.first1, size: 4})
      .subscribe((product: any) => {
        this.count = product.count;

        return (this.productList = product.data);
      });
    }
  }
  ngOnInit() : void {
    this.getAll();
    this.categoryService.getCategory().subscribe((data) => {
      this.cities = data.data.map((item: any) => {
        return { name: item.name, code: item._id};
      });
    });
  }
  deleteProduct(id: string) {
    this.confirmationService.confirm({
      accept: () =>{
        return this.productService.deleteProduct(id). subscribe((data:any) => {
          if(data.status === 0 ) {
            this.messageService.add({
              severity: 'success', 

              detail: 'Xoa  khong thanh cong '
            });
            if (data.count % this.rows1 === 0) {
              this.getAll(this.first1 - 1); 
            } else  {
              this.getAll();
            }
          }
        })
      }
    })
  }
  updateProduct(id: string) {
    return this.router.navigate([`/admin/products/${id}`])
  }
}
