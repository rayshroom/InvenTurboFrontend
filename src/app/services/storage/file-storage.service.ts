import { Injectable, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { mergeMap, last, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileStorageService {

    constructor(private afStorage: AngularFireStorage) {
    }

    uploadFile(file: File, cloudDir: string, fileName?: string): Observable<string> {
        let filepath;
        if (!fileName) {
            filepath = `${cloudDir}/${Date.now()}_${file.name}`;
        } else {
            const fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
            filepath = `${cloudDir}/${fileName}.${fileExtension}`;
        }
        const fileRef = this.afStorage.ref(filepath);
        const task = this.afStorage.upload(filepath, file);

        return task.snapshotChanges().pipe(
            last(),
            mergeMap(() => fileRef.getDownloadURL()),
        );
    }
}
