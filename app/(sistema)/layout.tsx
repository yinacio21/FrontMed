'use client'
import { useEffect } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


export default function SistemaLayout({children}:
    {children:React.ReactNode}){

        const{usuario} = useAuth();
        const router = useRouter();

        useEffect(()=> {
            if (usuario ==null) {
                router.push("/login")
            }
        })

        if(usuario == null)return null;

    return(
                <div className="flex flex-col flex-1">
                          
                          {/* <Sidebar /> */}
                          
                          <Header />
                          
                          {/* O main com flex-1 cresce para ocupar todo o espaço vago, empurrando o footer para o fim */}
                          <main className="flex-1 ">
                           
                              {children}
                          
                          </main>
                          
                          <Footer />
                          
                        </div>
    );
}