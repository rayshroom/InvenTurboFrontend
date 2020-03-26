import { Component, OnInit } from '@angular/core';
import { Personnel } from 'src/app/services/personnel/personnel.model';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personnel-management-page',
  templateUrl: './personnel-management-page.component.html',
  styleUrls: ['./personnel-management-page.component.scss']
})
export class PersonnelManagementPageComponent implements OnInit {

  employees: Personnel[];
  inviteeEmail: string;
  inviteState = true;

  constructor(
    public personnelService: PersonnelService,
    public orgSerivce: UserOrganizationService,
  ) {
    this.personnelService.getAllEmployeeOfOrganization(this.orgSerivce.getCurrentOrganization().oid).subscribe(data => {
      this.employees = data.employees;
    });
  }

  fireEmployee(employee: Personnel) {
    if(confirm(`Do you want to fire [${employee.displayName}]? This action cannot be undone`)) {
      this.personnelService.fireOneEmployeeOfOrganization(this.orgSerivce.getCurrentOrganization().oid, employee.uid).subscribe();
    }
  }

  inviteEmployee(email: string) {
    this.personnelService.createOrganizationInvite({
      email: email,
      oid: this.orgSerivce.getCurrentOrganization().oid,
      orgName: this.orgSerivce.getCurrentOrganization().name,
      position: 'Manager'
    }).subscribe(data => {
      this.inviteState = false;
    });
  }

  invite() {
    this.inviteeEmail = '';
    this.inviteState = true;
  }

  ngOnInit(): void {
  }

}
