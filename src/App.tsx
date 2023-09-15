
import LoginContent from './components/LoginContent';

import logo from '/images/logo-light.svg';
import file from '/images/graphic3.svg';
import './assets/css/iofrm-style.css';
import './assets/css/iofrm-theme7.css';
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome-all.min.css';
function App() {


  return (
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
        <LoginContent />
      </div>
    </div>

  )
}

export default App
