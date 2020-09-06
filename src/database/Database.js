import firebase from 'firebase';

export default class Database {
  static instance;

  constructor() {
    if (!Database.instance) {
      return this.createInstance();
    }

    return Database.instance;
  }

  createInstance = () => {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
      appId: process.env.FIREBASE_APPID,
    };

    console.log("firebaseConfig >> ", {});

    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database();
    Database.instance = this;
    return Database.instance;
  }
}
