"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "@/components/Layouts/AuthLayout";
import Link from "next/link";
import Svg from "./svg";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import PharmacySelection from "@/components/PharmacySelection";

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { login, loading, error, resetError } = useAuthStore();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await login(data.email, data.password);

    if (!error) {
      setShowModal(true); // Show the modal for pharmacy selection
    } else {
      toast.error("Échec de la connexion, vérifiez votre email et mot de passe");
    }
  };

  useEffect(() => {
    // Réinitialiser l'erreur lorsque le composant est monté pour éviter les messages d'erreur persistants
    resetError();
  }, [resetError]);

  const handlePharmacySelect = (pharmacyId: string) => {
    setSelectedPharmacy(pharmacyId);
    setShowModal(false);
    toast.success("Pharmacie sélectionnée !");
    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <h1 className="text-4xl font-bold text-primary">Dipharma</h1>
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
              <span className="mt-15 inline-block">
                <Svg />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Dipharma</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Connectez-vous au dashboard
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", { required: "L'email est requis" })}
                      type="email"
                      placeholder="Saisissez votre email"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.email ? "border-red-500" : ""}`}
                      disabled={loading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Le mot de passe est requis",
                      })}
                      type="password"
                      placeholder="Saisissez votre mot de passe"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.password ? "border-red-500" : ""}`}
                      disabled={loading}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 mb-4 text-sm">{error}</div>
                )}

                <div className="mb-5.5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    disabled={loading}
                  >
                    {loading ? "Connexion en cours..." : "Connexion"}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-base font-medium text-black dark:text-white">
                  Pas encore de compte?{" "}
                  <Link href="/" className="text-primary hover:underline">
                   Contactez votre pharmacie
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the PharmacySelection modal if showModal is true */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <PharmacySelection />
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default SignIn;
