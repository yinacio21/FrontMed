'use client'
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function SistemaLayout({ children }:
  { children: React.ReactNode }) {

  const { usuario, hidratado } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (hidratado && usuario == null) {
      router.push("/login");
    }
  }, [hidratado, usuario, router]);

  if (!hidratado || usuario == null) return null;

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
