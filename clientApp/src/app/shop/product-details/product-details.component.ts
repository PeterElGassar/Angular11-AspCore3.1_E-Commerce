import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/Product';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 4};
  slides = [
    {img: "/assets/img/product/product-7.jpg"},
    {img: "/assets/img/product/product-5.jpg"},
    {img: "/assets/img/product/product-6.jpg"},
    {img: "/assets/img/product/product-8.jpg"},   
  ];


  constructor(private shopServ: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(productId?: number) {
    this.shopServ.getProduct(+this.activatedRoute.snapshot.paramMap.get("id")).subscribe(prod => {
      

      this.product = prod;
    }, error => {
      console.log(error)
    });
  }


}
