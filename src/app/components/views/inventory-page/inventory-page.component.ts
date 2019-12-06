import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionManagementService } from 'src/app/services/transaction/transaction-management.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { Url } from 'url';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {
  user: firebase.User;
  org: UserOrganization;
  products: {pid: string, cols:number, rows:number, quantity: number, productPhoto: string}[];

    getTransactionItemBackgroundCss(color) {
        const col = color ? color : 'rgb(255,255,255)' ;
        return  {
            background: `linear-gradient(90deg, ${col} 12.5%, rgba(255,255,255,0) 12.5%)`,
            'padding-left': '3%'
        };
    }

    constructor(
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public m: TransactionManagementService,
    ) {
        this.products = [
            {
              pid: '00001',
              cols: 1,
              rows: 1,
              quantity: 40,
              productPhoto: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyP9fd4p1hd9kPKEiCfdiiXhzY-h2zr96PrlstJiUKeR6c5YZIk8GyBvbTfCkYt7sHTEnI6XU8RA&usqp=CAc"
            },
            {
              pid: '00001',
              cols: 2,
              rows: 1,
              quantity: 40,
              productPhoto: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyP9fd4p1hd9kPKEiCfdiiXhzY-h2zr96PrlstJiUKeR6c5YZIk8GyBvbTfCkYt7sHTEnI6XU8RA&usqp=CAc"
            },
            {
              pid: '00001',
              cols: 3,
              rows: 1,
              quantity: 40,
              productPhoto: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyP9fd4p1hd9kPKEiCfdiiXhzY-h2zr96PrlstJiUKeR6c5YZIk8GyBvbTfCkYt7sHTEnI6XU8RA&usqp=CAc"
            },
            {
              pid: '00001',
              cols: 4,
              rows: 1,
              quantity: 40,
              productPhoto: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyP9fd4p1hd9kPKEiCfdiiXhzY-h2zr96PrlstJiUKeR6c5YZIk8GyBvbTfCkYt7sHTEnI6XU8RA&usqp=CAc"
            },
            {
              pid: '00001',
              cols: 5,
              rows: 1,
              quantity: 40,
              productPhoto: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyP9fd4p1hd9kPKEiCfdiiXhzY-h2zr96PrlstJiUKeR6c5YZIk8GyBvbTfCkYt7sHTEnI6XU8RA&usqp=CAc"
            },
            {
              pid: '00001',
              cols: 6,
              rows: 1,
              quantity: 40,
              productPhoto: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTyP9fd4p1hd9kPKEiCfdiiXhzY-h2zr96PrlstJiUKeR6c5YZIk8GyBvbTfCkYt7sHTEnI6XU8RA&usqp=CAc"
            }
        ];
    }

    ngOnInit() {
    }

    public myfunction(){
      
    }
}
