import { ShopParams } from './../shared/models/ShopParams';
import { IProductType } from './../shared/models/ProductType';
import { IBrand } from './../shared/models/Brand';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/Product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild("searchInput" ,{static: true}) sreachTerm:ElementRef;
  title: string = "Peter El-Gassar";
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  totalCount: number;
  shopParams = new ShopParams();

  // brandIdSelected= 0;
  // typeIdSelected=0;
  // sortSelected = 'name';
  sortOptions = [
    { name: "Alphabetical", value: "name" },
    { name: "Price: Low To High", value: "priceAsc" },
    { name: "Price: High To Low", value: "priceDesc" }
  ]

  constructor(private shopServ: ShopService) { }

  ngOnInit() {
    this.getBrands();
    this.gettypes();
    this.getProducts();
  }

  getProducts() {
    this.shopServ.getProducts(this.shopParams).subscribe(response => {
      debugger
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      this.products = response.data;
      
    }, error => {
      console.log(error);
    });
  };

  getBrands() {
    this.shopServ.getBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    })
  };

  gettypes() {
    this.shopServ.getTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    })
  };

  onBrandSeleted(brandId: number) {
    this.shopParams.brandId = brandId;
    //invok
    this.getProducts();
  }
  onTypeSeleted(typeId: number) {
    this.shopParams.typeId = typeId;
    //invok
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    //invok
    this.getProducts();
  }

  onPageChange(event: any) {
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch(){
    this.shopParams.search = this.sreachTerm.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    this.sreachTerm.nativeElement.value='';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
