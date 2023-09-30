
import LoginContent from '../components/LoginContent';
import logo from '/images/logo-light.svg';
import file from '/images/graphic3.svg';
import '../assets/css/iofrm-style.css';
import '../assets/css/iofrm-theme7.css';
// import '../assets/css/bootstrap.min.css';
import '../assets/css/fontawesome-all.min.css';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { useForgetStore } from '../store/store';
import ForgotPassContent from '../components/ForgotPassContent';

function Login() {

    const [loading, setLoading] = useState(true);
    const { isForgotten } = useForgetStore();

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

                        <div className="form-body" style={{ height: "100vh" }}>
                            <div className="website-logo">
                                <a href="index.html">
                                    <div className="logo">
                                        <img className="logo-size" src={logo} alt="" />
                                    </div>
                                </a>
                            </div>
                            <div className="row">

                                <div className="col-md-4 col-sm-6 p-0 img-holder ">
                                    <div className="bg"></div>
                                    <div className="info-holder">
                                        <img src={file} alt="" />
                                    </div>
                                </div>

                                <div className='col-md-8 col-sm-6 p-0  form-holder'>
                                    {isForgotten ? (< ForgotPassContent />) :
                                        <LoginContent />
                                    }
                                </div>
                            </div>
                        </div>


                    </>
            }


        </>
    )
}

export default Login
