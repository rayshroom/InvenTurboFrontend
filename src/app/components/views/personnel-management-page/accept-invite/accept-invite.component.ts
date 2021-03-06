import { Component, OnInit, Input } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {

  @Input() public invitee: string;

  requestid: string;
  orgName: string;

  private buttons = [
    {
        title: 'Accept',
        classes: 'control-btn btn btn-success m-2',
        click: () => {
          this.personnelService.acceptInviteToOrganization(this.requestid)
        }
    },
    {
        title: 'Decline',
        classes: 'control-btn btn btn-danger m-2',
        click: () => {
          this.personnelService.declineInviteToOrganization(this.requestid)
        }
    }
  ]

  constructor(
    public personnelService: PersonnelService,
    private activatedRoute: ActivatedRoute,
  )
  { 
    this.requestid = this.activatedRoute.snapshot.paramMap.get('rid');
    this.personnelService.getOneOrganizationInvite(this.requestid).subscribe(data => {this.orgName = data.orgName});
  }

  ngOnInit(): void {
  }

}
