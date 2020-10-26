import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Database from './Database';
import { logger } from '../utils/LogManager';

class User extends Database {
    signup = async (email, password) => {
        try {
            const response = await this.app.auth().createUserWithEmailAndPassword(email, password);
            return this._success(response);
        } catch (e) {
            logger.error(e);
            return this._error(e);
        }
    }

    login = async (email, password) => {
        try {
            const response = await this.app.auth().signInWithEmailAndPassword(email, password);
            const currentUser = this.normalizeCurrentUser(response);
            this.saveAuthLocal(currentUser);
            return this._success(currentUser);
        } catch (e) {
            return this._error(e);
        }
    }

    logout = async () => {
        try {
            const response = await this.app.auth().signOut();
            AsyncStorage.removeItem('currentUser');
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

    socialSignIn = async (providerKey, token) => {
        const providers = {
            google: firebase.auth.GoogleAuthProvider,
            facebook: firebase.auth.FacebookAuthProvider,
            github: firebase.auth.GithubAuthProvider,
        };

        if (!providers[providerKey]) {
            throw new Error(`Provider key must be one of ${Object.keys(providers).join(', ').trim(', ')}`);
        }

        const provider = providers[providerKey];

        try {
            const credential = provider.credential(token);
            const response = await this.app.auth().signInWithCredential(credential);

            if (response?.status === 'error') {
                throw new Error(response);
            }
            const currentUser = this.normalizeCurrentUser(response);
            await this.saveAuthLocal(currentUser);
            return this._success(currentUser);
        } catch (e) {
            return this._error(e);
        }
    }

    getUser = async (uid) => {
        const userRef = `/users/${uid}`;

        try {
            return await this.database.ref(userRef)
                .once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    }

                    return false;
                });
        } catch (e) {
            logger.error('getUser:catch >> ', e);
            return false;
        }
    }

    addUser = async (currentUser) => {
        const userRef = `/users/${currentUser.uid}/`;
        const userExists = await this.getUser(currentUser.uid);

        // Add user only if the user doesn't exist
        if (userExists) {
            return false;
        }

        const profile = {
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            lists: {},
        };
        this.database.ref(userRef).set(profile);
        return true;
    }

    normalizeCurrentUser = (object) => {
        let user = object;
        const userStr = JSON.stringify(user);
        if (object?.user) {
            user = object?.user;
        }
        if (!user.email) {
            const regEx = /"email":(\s)?("(\S)+")/;
            const email = regEx.test(userStr)[2];
            user.email = email;
        }
        return user;
    }

    saveAuthLocal = async (currentUser) => {
        try {
            await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
            return true;
        } catch (e) {
            logger.console('User:saveAuthLocal >> ', e);
            throw new Error(e);
        }
    }

    getAuthLocal = async () => {
        try {
            const currentUserStr = await AsyncStorage
                .getItem('currentUser');
            const currentUser = JSON.parse(currentUserStr);
            return currentUser;
        } catch (e) {
            logger.console('User:getAuthLocal >> ', e);
            throw new Error(e);
        }
    }

    /**
     * @deprecated
     * @param {boolean} isSignup If is login flow or Signup flow
     * @param {function} callback Callback
     */
    checkAuthStateChanged = (isSignup = false, callback = () => {}) => {
        const unsubscribe = this.app.auth().onAuthStateChanged((currentUser) => {
            if (isSignup) {
                this.addUser(currentUser);
            }
            if (unsubscribe) {
                unsubscribe();
            }
            callback(currentUser);
        }, (error) => {
            logger.error('User:checkAuthStateChanged error >> ', error);
            if (unsubscribe) {
                unsubscribe();
            }
            callback(null, error);
        });
    }

    _success = (obj) => (
        obj ? { status: 'success', ...obj } : { status: 'success' }
    );

    _error = (err, message = '') => {
        logger.error(message, err);
        return { status: 'error', ...err };
    };
}

const user = new User();
// export { user };
export default user;
