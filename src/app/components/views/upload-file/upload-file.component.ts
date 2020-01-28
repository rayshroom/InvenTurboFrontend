// https://github.com/angular/angularfire/blob/master/docs/storage/storage.md

import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  ngOnInit() {
  }

  constructor(private storage: AngularFireStorage) {}

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task
    .snapshotChanges()
    .pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
    .subscribe()
  }
}
