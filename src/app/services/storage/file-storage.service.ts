import { Injectable, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { mergeMap, last, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileStorageService {

    constructor(private afStorage: AngularFireStorage) {
        // https://github.com/angular/angularfire/blob/master/docs/storage/storage.md
    }

    uploadFile(file: File, cloudDir: string): Observable<string> {
        const filepath = `${cloudDir}/${Date.now()}_${file.name}`;
        const fileRef = this.afStorage.ref(filepath);
        const task = this.afStorage.upload(filepath, file);

        return task.snapshotChanges().pipe(
            last(),
            mergeMap(() => fileRef.getDownloadURL()),
        );
    }
}
