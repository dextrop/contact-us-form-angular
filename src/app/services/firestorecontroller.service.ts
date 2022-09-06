import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from './db.constants';

@Injectable({
  providedIn: 'root'
})
export class FirestorecontrollerService {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  app_conf = firebaseConfig;
  app:any;
  db:any = null;
  error_msg = "Firebase configration not added, \ntry to replace default firebase cofigration with your application configration \nin file src/app/services/db.constants.ts";

  constructor() {
    // Initialize Firebase
    if (this.app_conf.apiKey === "FIREBASE_API_KEY") {      
      console.error(this.error_msg);
    } else {
      this.app = initializeApp(this.app_conf);
      this.db = getFirestore(this.app);        
    }    
  }

  get(collection_name:string) {
    /* Get Data from Collection name */
    if (this.db == null) {
      return this.returnerror(this.error_msg);
    }
    let self = this;
    return new Promise(
      function (resolve, reject) {
        const citiesCol = collection(self.db, collection_name);
        
        const citySnapshot = getDocs(citiesCol).then(
          data => {
            let final_set:any = [];
            data.forEach(element => {
              final_set.push(element.data());
            });
            resolve(final_set);
          }
        ).catch(
          error => {
            reject(error);
          }
        );
      }
    );    
  }

  add(collection_name:string, doc_id:string, doc_obj:any) {
    if (this.db == null) {
      return this.returnerror(this.error_msg);
    }
    /* Add Data to collection name with unique doc id */
    let self = this;
    return new Promise(
      function (resolve, reject) {
        setDoc(doc(self.db, collection_name, doc_id), doc_obj).then(
          data => {resolve(true);}
        ).catch(
          error => {reject(error);}
        );
        
      }
    );
  }    

  update(collection_name:string, doc_id:string, doc_obj:any) {
    if (this.db == null) {
      return this.returnerror(this.error_msg);
    }
    /* Update Data to collection name with unique doc id */
    let firebase_doc = doc(this.db, collection_name, doc_id);
    return new Promise(
      function (resolve, reject) {
        updateDoc(firebase_doc, doc_obj)
        .then(data => {resolve(true)})
        .catch(error => {reject(error)});
      }
    );    
  }

  delete(collection_name:string, doc_id:string) {
    if (this.db == null) {
      return this.returnerror(this.error_msg);
    }

    /* Delete Data from collection name with unique doc id */
    let firebase_doc = doc(this.db, collection_name, doc_id);
    return new Promise(
      function (resolve, reject) {
        deleteDoc(firebase_doc)
        .then(data => {resolve(true)})
        .catch(error => {reject(error)});
      }
    );  
  }

  returnerror(error:string) {
    return new Promise(
      function (resolve, reject) {
        reject(error)
      }
    ); 
  }
}
