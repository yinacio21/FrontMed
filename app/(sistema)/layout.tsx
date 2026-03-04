import Footer from "../components/Footer"
import Header from "../components/Header"

export default function SistemaLayout({children}:
    {children:React.ReactNode}){
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