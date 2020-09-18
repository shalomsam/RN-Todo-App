import firebase from 'firebase';
import Database from './Database';

class User extends Database {
    signup = async (email, password) => {
        try {
            const response = await this.app.auth().createUserWithEmailAndPassword(email, password);
            this.app.auth().onAuthStateChanged((currentUser) => {
                const userRef = `users/${currentUser.uid}/`;
                const profile = {
                    uid: currentUser.uid,
                    name: currentUser.displayName,
                    email: currentUser.email,
                };
                this.database.ref(userRef).set(profile);
            });
            return this._success(response);
        } catch (e) {
            return this._error(e);
        }
    }

    login = async (email, password) => {
        try {
            const response = await this.app.auth().signInWithEmailAndPassword(email, password);
            return this._success(response);
        } catch (e) {
            return this._error(e);
        }
    }

    logout = async () => {
        try {
            const response = await this.app.auth().signOut();
            return this._success(response);
        } catch (e) {
            return this._error(e);
        }
    }

    forgotPassEmail = async (email) => {
        try {
            const response = this.app.auth().sendPasswordResetEmail(email);
            return this._success(response);
        } catch (e) {
            return this._error(e);
        }
    }

    // eslint-disable-next-line camelcase
    googleSignIn = (id_token) => {
        const creds = firebase.auth.GoogleAuthProvider.credential(id_token);
        this.app.auth().signInWithCredential(creds);
    }

    _success = (obj) => (
        obj ? { status: 'success', ...obj } : { status: 'success' }
    );

    _error = (err) => (
        { status: 'error', ...err }
    );
}

const user = new User();
// export { user };
export default user;
