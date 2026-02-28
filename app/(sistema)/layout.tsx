import Footer from "../components/Footer"
import Header from "../components/Header"

export default function SistemaLayout({children}:
    {children:React.ReactNode}){
    return(
                <div className="flex flex-col flex-1">
                          
                          {/* <Sidebar /> */}
                          
                          <Header />
                          
                          {/* O main com flex-1 cresce para ocupar todo o espaço vago, empurrando o footer para o fim */}
                          <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
                            <div>
                              {children}
                            </div>
                          </main>
                          
                          <Footer />
                          
                        </div>
    );
}