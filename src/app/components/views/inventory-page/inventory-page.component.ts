import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionManagementService } from 'src/app/services/transaction/transaction-management.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { Url } from 'url';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {
  user: firebase.User;
  org: UserOrganization;
  transactions: {pid: string, quantity: number, imageURL: Url}[];
  constructor(
    public auth: AuthService,
    public userOrg: UserOrganizationService,
    public m: TransactionManagementService
  ) { 

  }

  ngOnInit() {
  }
}
