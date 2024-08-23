import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { usePharmacyStore } from "@/store/pharmacyStore";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader"; // Import the Loader component

const PharmacySelection = () => {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const setSelectedPharmacy = usePharmacyStore((state) => state.setSelectedPharmacy);
  const router = useRouter();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pharmacy"));
        const pharmacyList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPharmacies(pharmacyList as any);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      } finally {
        setLoading(false); // Stop loading after fetch is complete
      }
    };
    fetchPharmacies();
  }, []);

  const handleSelect = (pharmacyId: string) => {
    setSelectedPharmacy(pharmacyId);
    router.push("/dashboard");
  };

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Selectionnez votre Pharmacie</h3>
      <div className="grid grid-cols-1 gap-4">
        {pharmacies.map(pharmacy => (
          <button
            key={pharmacy.id}
            onClick={() => handleSelect(pharmacy.id)}
            className="w-full bg-primary text-white rounded-lg py-2 px-4 shadow-md hover:bg-primary-dark transition"
          >
            {pharmacy.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PharmacySelection;
