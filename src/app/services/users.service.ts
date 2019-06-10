import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<User[]>;
  userCollection: AngularFirestoreCollection<User>;
  
  constructor(private afs: AngularFirestore) { 
    this.userCollection = this.afs.collection<User>('users');

    this.users = this.userCollection.snapshotChanges().
      pipe(
        map( actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(userId: string): Observable<User> {
    return this.userCollection.doc<User>(userId).valueChanges()
      .pipe(
        take(1),
        map( user => {
          user.uid = userId;
          return user;
        })
      );
  }

  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  setUser(user: User, code: string): Promise<void> { 
    return this.userCollection.doc(code).set(user);
  }

}
