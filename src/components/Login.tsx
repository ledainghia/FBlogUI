import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForgetStore } from '../store/store';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt from 'jwt-decode'

interface userGoogle {
    name: string,
    mail: string,
}

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { setForget } = useForgetStore();
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handleForget = () => {
        setForget(true); // Đặt isForgotten thành true
    };



    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = userRef.current?.value;
        const password = passwordRef.current?.value;
        const data = {
            username: user,
            password: password,
        };


        await axios
            .post('https://api.fublog.tech/api/login', data)
            .then((response) => {
                console.log(response);
                toast.success('Login success!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((error) => {
                console.log(error.response);
                toast.error(error.response.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <form
                action="post"
                onSubmit={handleSubmitLogin}
                autoComplete="off"
            >
                <input className="form-control" ref={userRef} type="text" name="username" placeholder="User name" required />
                <div className="password-container">
                    <input
                        className="form-control"
                        type={passwordVisible ? "text" : "password"} // Sử dụng trạng thái để xác định loại input
                        name="password"
                        id="password"
                        placeholder="Password"
                        ref={passwordRef}
                        required
                    />
                    <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye} // Sử dụng icon phù hợp với trạng thái
                        onClick={togglePasswordVisibility} // Khi bấm vào icon, gọi hàm để chuyển đổi trạng thái
                        className='fa-eye'
                    />
                </div>
                <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">
                        Login
                    </button>
                    <a onClick={handleForget}>Forget password?</a>
                </div>
            </form>
            <div className="other-links">
                <span>Hoặc đăng nhập bằng</span>
                {/* <a href="#" style={{ color: "#ffa94d" }}>
                    Google
                </a> */}

                <GoogleOAuthProvider clientId="673525613876-8si0uta7f5u7iq1po5rsj4lsur972vtj.apps.googleusercontent.com"><GoogleLogin
                    onSuccess={async credentialResponse => {
                        console.log(credentialResponse);
                        const idToken = credentialResponse?.credential;
                        if (idToken) {
                            try {
                                console.log(idToken);
                                const user: userGoogle = jwt(idToken); // decode your token here
                                console.log('Decoded Token: ', typeof (user));
                                const name = user.name;
                                toast.success(`Login success! Hi ${name}`, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });

                            } catch (error) {
                                console.error('Error decoding token:', error);
                            }
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        toast.error('Login Failed', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                    }}
                /></GoogleOAuthProvider>
            </div>
        </>
    );
}
