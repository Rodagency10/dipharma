import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";
import AuthLayout from "@/components/Layouts/AuthLayout";

export const metadata: Metadata = {
  title:
    "Dipharma | Plateforme de pharmacie digitale",
  description: "Plateforme de pharmacie digitale",
};

export default function Home() {
  return (
    <>
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    </>
  );
}
