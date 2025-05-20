// "use client";
// import { UseAuthStore } from "@/store/useAuthStore";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// type AuthProtectedProps = {
//   children: React.ReactNode;
// };

// const AuthProtected = ({ children }: AuthProtectedProps) => {
//   const { user } = UseAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/login"); // Redirect to login if not authenticated
//     }
//   }, [user]);

//   return <>{children}</>;
// };

// export default AuthProtected;



// "use client";
// import { UseAuthStore } from "@/store/useAuthStore";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// type AuthProtectedRoutesType = {
//     children: React.ReactNode;
// }

// const AuthProtectedRoutes = ({ children }: AuthProtectedRoutesType) => {
//     const { user, loading } = UseAuthStore((state) => state);
//     const router = useRouter();
//     const [checkingAuth, setCheckingAuth] = useState(true); // Local loading state

//     useEffect(() => {
//         if (!loading) {
//             if (!user) {
//                 router.push("/");
//             }
//             setCheckingAuth(false);
//         }
//     }, [user, loading, router]);

//     if (checkingAuth) return <div className="h-screen flex justify-center items-center"><Loader2 className="size-16 animate-spin" /></div>;

//     return <>{children}</>;
// }

// export default AuthProtectedRoutes;
