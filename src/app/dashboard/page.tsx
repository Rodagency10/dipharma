"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePharmacyStore } from "@/store/pharmacyStore";
import { useStockStore } from "@/store/stockStore";
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

const Home = () => {
  const selectedPharmacy = usePharmacyStore((state) => state.selectedPharmacy);
  const { stockItems, setStockItems } = useStockStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStock = async () => {
      if (!selectedPharmacy) return;

      try {
        setLoading(true);
        const stockQuery = query(collection(db, "stocks"), where("pharmacy.uid", "==", selectedPharmacy));
        const querySnapshot = await getDocs(stockQuery);
        const stockList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        localStorage.setItem('stockItems', JSON.stringify(stockList)); // Stocke les données dans localStorage
        setStockItems(stockList as any);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [selectedPharmacy, setStockItems]);

  useEffect(() => {
    const savedStockItems = localStorage.getItem('stockItems');
    if (savedStockItems) {
      setStockItems(JSON.parse(savedStockItems));
    }
  }, [setStockItems]);
  
  return (
    <DefaultLayout>
      <div className="p-4">
        {selectedPharmacy ? (
          <div>
            <h1 className="text-2xl font-bold">Bienvenue sur votre Tableau de bord</h1>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Stock du jour : {new Date().toLocaleDateString()}</h2>
              {loading ? (
                <p>Loading stock data...</p>
              ) : stockItems.length > 0 ? (
                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                            Code du médicament
                          </th>
                          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                            Catégorie
                          </th>
                          <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                            Nom
                          </th>
                          <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                            Quantité
                          </th>
                          <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                            Disponibilité
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockItems.map(stock => (
                          <tr key={stock.id}>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                              <p className="text-black dark:text-white">
                                <strong>{stock.drug.code}</strong>
                              </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {stock.drug.category}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {stock.drug.name}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {stock.quantityInStock}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                              <p
                                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                  stock.quantityInStock > 0
                                    ? "bg-success text-success"
                                    : "bg-danger text-danger"
                                }`}
                              >
                                {stock.quantityInStock > 0
                                  ? "En stock"
                                  : "En rupture"}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p>No stock available for this pharmacy.</p>
              )}
            </div>
          </div>
        ) : (
          <p>No pharmacy selected. Please select a pharmacy to proceed.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Home;
