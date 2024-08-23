// lib/firestore.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchPharmacyData = async (pharmacyId: string) => {
  const docRef = doc(db, "pharmacy", pharmacyId); // "pharmacy" est le nom de votre collection
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No such document!");
    return null;
  }
};
