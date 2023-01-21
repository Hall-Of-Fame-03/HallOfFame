import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import {firestore} from '../firebase';

export async function createUserCollection(user){
    const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
        console.log("adding doc");
        await addDoc(collection(firestore, "users"), {
           uid: user.uid,
            name: user.displayName,
            email: user.email,
            year: "Year/Passout",
            branch: "Branch",
            description: "Headline",
            photoURL: user.photoURL,
            createdAt: new Date()
        });
    }
}