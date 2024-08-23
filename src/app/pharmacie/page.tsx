"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchPharmacyData } from "@/lib/firestore";
import { usePharmacyStore } from "@/store/pharmacyStore";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl?: string; // Ajoute d'autres champs si nécessaire
}

const Profile = () => {
  const pharmacyId = usePharmacyStore((state) => state.selectedPharmacy);

  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPharmacyData = async () => {
      try {
        setLoading(true);
        const data = await fetchPharmacyData(pharmacyId as string);
        setPharmacy(data as Pharmacy);
      } catch (error) {
        console.error("Error fetching pharmacy data:", error);
      } finally {
        setLoading(false);
      }
    };

    getPharmacyData();
  }, [pharmacyId]);

  if (loading) return <DefaultLayout>Loading...</DefaultLayout>;

  if (!pharmacy) return <DefaultLayout>Pharmacy not found.</DefaultLayout>;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Pharmacie" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={pharmacy.imageUrl || "/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            {/* <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={pharmacy.imageUrl || "/images/user/user-06.png"} // Remplace cette image par celle de la pharmacie si disponible
                  width={160}
                  height={160}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                />
              </div>
            </div> */}
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {pharmacy.name}
              </h3>
              <p className="font-medium">{pharmacy.address}</p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                {/* Ajoutez plus d'informations si nécessaire */}
              </div>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                 A propos de la pharmacie
                </h4>
                <p className="mt-4.5">
                  {pharmacy.description}
                </p>
              </div>


            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
