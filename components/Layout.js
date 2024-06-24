import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import PatternBackground from "./PatternBackground"

const Layout = ({ children, pagina }) => {
    return (
        <>
            <Head>
                <title>{ pagina }</title>
            </Head>
            
            <div className="bg-gray-100 absolute w-full min-h-screen">
                <div>
                    <div className="bg-sky-600">
                        <Header />
                    </div>
                    
                    <PatternBackground>
                        <main className="mt-20 mb-10">
                            { children }
                        </main>
                    </PatternBackground>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Layout