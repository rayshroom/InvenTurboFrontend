import { Component, OnInit } from '@angular/core';
import { FileStorageService } from 'src/app/services/storage/file-storage.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
    public downloadURL: string;

    ngOnInit() {}

    constructor(private fs: FileStorageService) {}

    uploadFile(event) {
        this.fs.uploadFile(event.target.files[0], '/images/test')
            .subscribe(url => this.downloadURL = url);
    }
}
