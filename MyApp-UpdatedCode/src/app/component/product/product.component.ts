import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public productList: any;
  public filterCategory: any
  searchkey:string = "";
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getRecord().subscribe((res) => {
      this.productList = res.data;   
      this.filterCategory = res.data;
      
      this.productList.forEach((a: any) => {
        if (
          a.category === "men's clothing" ||
          a.category === "women's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchkey = val;
    });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a:any)=>{
      if(a.category == category || category == ''){
        return a;
      }
    })
  }
}
