
import LoginContent from './components/LoginContent';

import logo from '/images/logo-light.svg';
import file from '/images/graphic3.svg';
import './assets/css/iofrm-style.css';
import './assets/css/iofrm-theme7.css';
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome-all.min.css';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import './App.css'
import { useForgetStore } from './store/store';
import ForgotPassContent from './components/ForgotPassContent';

function App() {

  const [loading, setLoading] = useState(false);
  const { isForgotten } = useForgetStore();

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

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

            <div className="form-body">
              <div className="website-logo">
                <a href="index.html">
                  <div className="logo">
                    <img className="logo-size" src={logo} alt="" />
                  </div>
                </a>
              </div>
              <div className="row">
                <div className="img-holder">
                  <div className="bg"></div>
                  <div className="info-holder">
                    <img src={file} alt="" />
                  </div>
                </div>
                {isForgotten ? (< ForgotPassContent />) :
                  <LoginContent />
                }
              </div>
            </div>

          </>
      }
    </>
  )
}

export default App
