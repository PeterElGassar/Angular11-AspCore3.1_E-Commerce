import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private shopServ: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(productId?: number) {
    this.shopServ.getProduct(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(product => {
      this.product = product;
    }, error => {
      console.log(error)
    });
  }


}
