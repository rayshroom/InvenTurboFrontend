// https://github.com/angular/angularfire/blob/master/docs/storage/storage.md

import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload.service'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  // uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  downloadURL: string;

  ngOnInit() {
  }

  constructor(private m: FileUploadService) {
  }

  uploadFile(event) {
    this.m.uploadFile(event).subscribe(url => { this.downloadURL = url });
  }

}
