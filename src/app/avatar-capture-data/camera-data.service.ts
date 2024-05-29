// import {Injectable} from '@angular/core';
//
// import {BehaviorSubject} from 'rxjs';
// import {SQLite, SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';
//
// export class Photo {
//   type: number;
//   data: string;
// }
//
// @Injectable()
// export class CameraDataService {
//   selectedPhoto = new BehaviorSubject<string>('');
//
//   cameraDirection = new BehaviorSubject('rear');
//   state: number;
//   private database: SQLiteObject;
//   constructor(
//     private sqlite: SQLite
//   ) {
//     this.state = 0;
//     //YP test
//     this.sqlite.create({
//       name: 'items.db',
//       location: 'default'
//     })
//       .then((db: SQLiteObject) => {
//         // db.executeSql(`DROP table if exists photos`, [])
//         //   .then(() => console.log('DROP SQL'))
//         //   .catch(e => console.log(e));
//         this.database = db;
//         db.executeSql(`create table if not exists photos(
//             data TEXT,
//             type INT
//         )`, [])
//           .then(() => console.log('Executed SQL'))
//           .catch((e: any) => console.log(e));
//       })
//       .catch((e: any) => console.log(e));
//   }
//   // Add
//   addPhoto(photo: Photo) {
//     const data = [photo.type, photo.data];
//     const type = photo.type;
//     this.database.executeSql('INSERT INTO photos (type, data) VALUES (?, ?)', data)
//       .then(res => {
//         console.log('Add sql');
//         // console.log(res);
//         // return res;
//         //this.getPhoto(type).then(() => res);
//       }).catch((e: any) => console.log(e));
//   }
//   // Update
//   updatePhoto(photo: Photo) {
//     const data = [photo.type, photo.data];
//     const type = photo.type;
//     this.database.executeSql(`UPDATE photos SET type = ?, data = ? WHERE type = ${type}`, data)
//       .then(res => {
//         console.log('Update sql');
//         // console.log(res);
//         // return res;
//         //this.getPhoto(type).then(() => res);
//       }).catch((e: any) => console.log(e));
//   }
//   //Update and insert
//   updatePhotoAndInsert(photo: Photo) {
//     const type = photo.type;
//     this.getPhotoCount(type).then(count => {
//       if ( count === 0 ) {
//         this.addPhoto(photo);
//       }else {
//         this.updatePhoto(photo);
//       }
//     });
//   }
//   getPhotoCount(type: number){
//     return this.database.executeSql('SELECT count(*) as count FROM photos WHERE type = ?', [type]).then(res => {
//       // console.log('Get Count sql');
//       // console.log(res);
//       // console.log(count);
//       return res.rows.item(0).count;
//     }).catch(e => console.log(e));
//   }
//   // Get single object
//       // getPhoto(type): Promise<Photo> {
//   //   return this.database.executeSql('SELECT * FROM photos WHERE type = ?', [type]).then(res => ({
//   //     type: res.rows.item(0).type,
//   //     data: res.rows.item(0).data
//   //   }));
//   // }
//   incrementState(){
//     this.state++;
//   }
//   resetState(){
//     this.state = 0;
//   }
//   getState(){
//     return this.state;
//   }
//   pushPhotoData(photoSrc: string) {
//     this.selectedPhoto.next(photoSrc);
//   }
//
//   getPhotoData() {
//     return this.selectedPhoto;
//   }
//   storePhotoData(photoSelected: { photo_type: any; }){
//     const photoType = photoSelected.photo_type;
//     //localStorage.setItem(`photoSelected-${photoType}`, JSON.stringify(photoSelected));
//     const photo = new Photo();
//     photo.type = photoType;
//     photo.data = JSON.stringify(photoSelected);
//     this.updatePhotoAndInsert(photo);
//   }
//
//   getStoredPhotos(){
//     const retrivedPhotos = [];
//     return this.database.executeSql('SELECT * FROM photos', []).then((res: { rows: { length: number; item: (arg0: number) => { (): any; new(): any; type: any; data: any; }; }; }) => {
//       // console.log('len');
//       // console.log(res.rows.length);
//       for (let i = 0; i < res.rows.length; ++i){
//         const type = res.rows.item(i).type;
//         const data = res.rows.item(i).data;
//         // console.log(data);
//         retrivedPhotos.push(JSON.parse(data));
//       }
//       // console.log(retrivedPhotos);
//       return retrivedPhotos;
//     });
//   }
//   clearStoredPhotos(){
//     const photo0 = 'photoSelected-0';
//     const photo1 = 'photoSelected-1';
//     if(localStorage.getItem(photo0) !== null) {
//       localStorage.removeItem(photo0);
//     }
//     if (localStorage.getItem(photo1) !== null){
//       localStorage.removeItem(photo1);
//     }
//   }
// }
