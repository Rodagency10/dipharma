import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import PharmacySelection from "./PharmacySelection"; // Assure-toi que le chemin est correct
import { db } from "../../firebase";

const Stock = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [stock, setStock] = useState<any[]>([]);

  const handlePharmacySelect = (pharmacyId : string) => {
    setSelectedPharmacy(pharmacyId as any);
    fetchStock(pharmacyId);
  };

  const fetchStock = async (pharmacyId : string) => {
    const q = query(collection(db, "stock"), where("pharmacyId", "==", pharmacyId));
    const querySnapshot = await getDocs(q);
    const stockItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStock(stockItems as any);
  };

  return (
    <div>
      {!selectedPharmacy ? (
        <PharmacySelection />
      ) : (
        <div>
          <h3>Stock de la Pharmacie: {selectedPharmacy}</h3>
          <ul>
            {stock.map(item => (
              <li key={item.id}>{item.drugName} - Quantité: {item.quantity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stock;
