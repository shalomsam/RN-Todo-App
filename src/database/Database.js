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
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DB_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database();
    Database.instance = this;
    return Database.instance;
  }
}
