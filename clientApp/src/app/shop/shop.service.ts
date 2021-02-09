import { ShopParams } from './../shared/models/ShopParams';
import { IBrand } from './../shared/models/Brand';
import { IProductType } from './../shared/models/ProductType';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPageination } from '../shared/models/Pageination';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0)
      params = params.append("brandId", shopParams.brandId.toString());

    if (shopParams.typeId !== 0)
      params = params.append("typeId", shopParams.typeId.toString());

    if (shopParams.search)
      params = params.append("search", shopParams.search);



    //default sorting by name
    params = params.append("sort", shopParams.sort);
    params = params.append("pageIndex", shopParams.pageNumber.toString());
    params = params.append("pageSize", shopParams.pageSize.toString());

    return this.http.get<IPageination>(this.baseUrl + 'products?', { observe: "response", params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/brands');
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/types');
  }

   getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);

  }
}
