import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private Database: AngularFirestore,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }
  DBRef = this.Database.collection('rooms');

  createRoom(name: string) {
    this.DBRef.add({
      name: name,
      status: true
    }).then(() => {
      this.showToast("Room creado correctamente");
    }).catch(err => console.log(err.message));

  }
// observable
  readRooms() {
    return this.DBRef.snapshotChanges().pipe(map(rooms => {
      return rooms.map(room => {

        const data = room.payload.doc.data();
        const id = room.payload.doc.id;
        console.log(data);
        return { id, ...data };
      })
    }))

  }

  updateRooms(id: string, name: string) {
    this.DBRef.doc(id).update({
      name: name
    })
    this.showToast("Elemento actualizado con exito");
  }

  deleteRooms(id: string) {
    this.DBRef.doc(id).delete().then(() => {
      this.showToast("Elemento eliminado con exito");
    }).catch(err => console.log(err.message))
  }
  // Components:

  async addRoomAlert() {
    const alert = await this.alertController.create({
      header: 'Add New Room!',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          placeholder: 'Name Room'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            console.log(name.nameRoom);
            this.createRoom(name.nameRoom);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async updateRoomAlert(id: string, name: string) {
    const alert = await this.alertController.create({
      header: 'Update Room!',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          value: name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            console.log(name.nameRoom);
            this.updateRooms(id, name.nameRoom);
            // this.createRoom(name.nameRoom);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message:string) {
    const toast = await this.toastController.create({
      header: '¡Message to the aplication!',
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'

    });
    toast.present();
  }
}
