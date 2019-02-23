import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

firebase.initializeApp({
    apiKey: "AIzaSyDg6w_tTGiUEon5BRr2iDHu9J7WtZ-3JsI",
    authDomain: "gamelike-status.firebaseapp.com",
    databaseURL: "https://gamelike-status.firebaseio.com",
    projectId: "gamelike-status",
    storageBucket: "gamelike-status.appspot.com",
    messagingSenderId: "326378734742",
});

export class Firebase {
    static get uid() {
        const user = firebase.auth().currentUser;
        return user ? user.uid : undefined;
    }

    static async getUid() {
        return this.uid || await this.login();
    }

    static async login() {
        const provider = new firebase.auth.TwitterAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);
            if (!result.user) return undefined;
            return result.user.uid;
        } catch(e) {
            alert(e.message);
            return undefined;
        }
    }

    static storeRef(uid: string, id: string, file: string) {
        return firebase.storage().ref(`/user/${uid}/store/${id}`).child(file);
    }

    static async save(uid: string, id: string, data: object) {
        try {
            await this.storeRef(uid, id, "data.json").putString(JSON.stringify(data));
            return true;
        } catch (e) {
            alert(e.message);
            return false;
        }
    }

    static async load(uid: string, id: string) {
        try {
            let url: any;
            try {
                url = await this.storeRef(uid, id, "data.json").getDownloadURL();
            } catch (e) {
                return undefined;
            }
            const result = await fetch(url);
            return await result.json();
        } catch (e) {
            alert(e.message);
            return undefined;
        }
    }
}
