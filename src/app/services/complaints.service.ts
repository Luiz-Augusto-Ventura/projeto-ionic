import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint';

import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  complaints: Observable<Complaint[]>;
  complaintCollection: AngularFirestoreCollection<Complaint>;
  
  constructor(private afs: AngularFirestore) { 
    this.complaintCollection = this.afs.collection<Complaint>('complaints');

    this.complaints = this.complaintCollection.snapshotChanges().
      pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getComplaints(): Observable<Complaint[]> {
    return this.complaints;
  }

  getComplaint(id: string): Observable<Complaint> {
    return this.complaintCollection.doc<Complaint>(id).valueChanges()
      .pipe(
        take(1),
        map(complaint => {
          complaint.id = id;
          return complaint;
        })
      );
  }

  addComplaint(complaint: Complaint): Promise<DocumentReference> {
    return this.complaintCollection.add(complaint);
  }

  updateComplaint(complaint: Complaint): Promise<void> {
    return this.complaintCollection.doc(complaint.id)
      .update({
        titulo: complaint.titulo,
        descricao: complaint.descricao,
        resolvido: complaint.resolvido,
        imagem: complaint.imagem,
        localizacao: complaint.localizacao
      });
  }

  deleteComplaint(id: string): Promise<void> {
    return this.complaintCollection.doc(id).delete();
  }
}
