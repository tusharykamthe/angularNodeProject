import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
 public products : any = [];
 public grandTotal !: number;
  constructor(private cartService : CartService) {  }
  
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();

      })
    }
    removeItem(item:any){
         this.cartService.removeCartItem(item);
    }
    emptycart(){
      this.cartService.removeAllCart();
    }

 paymentRequest: google.payments.api.PaymentDataRequest={
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods:[
      {
        type:'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY','CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type:'PAYMENT_GATEWAY',
          parameters:{
            gateway: 'example',
            gatewayMerchantId:'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo:{
      merchantId:'12345678901234567890',
      merchantName:'Demo Merchant'
    },
    transactionInfo:{
      totalPriceStatus:'FINAL',
      totalPriceLabel:'Total',
      totalPrice:'10',
      currencyCode:'EUR',
      countryCode:'BE'
    },
    callbackIntents:['PAYMENT_AUTHORIZATION']
  };
  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData 
  ) => {
       console.log('payment authorized', paymentData);
       return {
        transactionState: 'SUCCESS'
       }
  }
  onError = (event: ErrorEvent): void =>{
    console.error('error', event.error)
  }
    
  }


