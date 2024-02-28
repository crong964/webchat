import * as st from "firebase/storage";
import * as fb from "firebase/app";
import fs from "fs"

import 'dotenv/config'
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
    databaseURL: process.env.DATABASEURL
};
class Firebase {
    static app = fb.initializeApp(firebaseConfig);
    static storage = st.getStorage(Firebase.app);

    constructor() {

    }
    static async UploadImage(path: string, contentType: string) {
        var pathUpload = ""
        var ss = path.split("\\");
        var name = ss[ss.length - 1]
        var data = fs.readFileSync(path, { encoding: "base64" })
        var ref = st.ref(Firebase.storage, name)
        try {

            await st.uploadString(ref, data, "base64", { contentType: contentType })
            pathUpload = await st.getDownloadURL(ref)
            pathUpload = pathUpload.replace("https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/", "")
        } catch (error) {
            console.log(error);

        }
        return pathUpload
    }
    static async DeleteFile(file: string) {
        var check = false
        var files = file.split("?")
        var name = files[0]
        const ref = st.ref(Firebase.storage, name);

        try {
            st.deleteObject(ref)
            check = true
        } catch (error) {
            console.log(error);
        }
        return check
    }
}
export default Firebase
