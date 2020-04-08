import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  product = {
    price: 99.99,
    description: 'InvenTurbo - Standard License',
  };

  paidFor = false;

  constructor() { }

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
