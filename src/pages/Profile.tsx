import { useEffect, useState } from 'react'
import HeaderProfile from '../components/HeaderProfile';
import Footer from '../components/Footer';
import ContentProfile from '../components/ContentProfile';
import Loading from '../components/Loading';

export default function Profile() {
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
            {loading ? <Loading />
                :
                <> <HeaderProfile></HeaderProfile>
                    <ContentProfile></ContentProfile>
                    <Footer></Footer>
                </>
            }

        </>
    )
}