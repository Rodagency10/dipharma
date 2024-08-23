import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"; // Firebase config

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedRoute(props: any) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Chargement...</div>; // Indicateur de chargement
    }

    if (!user) {
      return null; // Vous pouvez également rediriger l'utilisateur ici
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
