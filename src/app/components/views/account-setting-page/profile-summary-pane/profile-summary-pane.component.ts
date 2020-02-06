import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/services/auth/uam.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileStorageService } from 'src/app/services/storage/file-storage.service';

@Component({
    selector: 'app-profile-summary-pane',
    templateUrl: './profile-summary-pane.component.html',
    styleUrls: ['./profile-summary-pane.component.scss']
})
export class ProfileSummaryPaneComponent implements OnInit {
    @Input()
    public user: firebase.User;

    @Input()
    public profile: Profile;

    public uploadingAvatar = false;

    public profileImage = {
        classes: [' ', 'profile-photo', 'w-100']
    };

    constructor(private auth: AuthService, public fs: FileStorageService) {
    }

    ngOnInit() {}

    onAvatarChange(event) {
        this.uploadingAvatar = true;
        this.auth.getCurrentUser().subscribe(user => {
            this.fs.uploadFile(event.target.files[0], '/images/profiles', user.uid).subscribe(async url => {
                await user.updateProfile({ photoURL: url });
                this.uploadingAvatar = false;
            });
        });
    }

    onAvatarRemove() {
        this.uploadingAvatar = true;
        this.auth.getCurrentUser().subscribe(async user => {
            await user.updateProfile({ photoURL: null });
            this.uploadingAvatar = false;
        });
    }

    darkenProfileImage() {
        this.profileImage.classes[0] = 'darken';
    }

    brightenProfileImage() {
        this.profileImage.classes[0] = ' ';
    }
}
