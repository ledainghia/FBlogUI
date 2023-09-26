import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/home.css'
import '../assets/css/homeicon.css'
import Header from '../components/Header'
import Hero from '../components/Hero';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';



export default function Home() {

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (document.readyState === 'complete') {
            setLoading(false);
        } else {
            document.onreadystatechange = function () {
                if (document.readyState == "complete") {
                    setLoading(false);
                }
            }
        }
    }, [setLoading])



    return (
        <>
            {
                loading ?
                    <div style={{ textAlign: 'center', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <HashLoader
                            color="rgba(255, 193, 166, 1)"
                            cssOverride={{}}
                            size={100}
                        />
                    </div>
                    :
                    <>
                        <div>
                            <Header />
                            <Hero />
                            <MainContent />
                            <Footer />
                        </div>

                    </>
            }
        </>
    )
}
