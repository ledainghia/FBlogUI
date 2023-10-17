import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../customHooks/configToast';
import { useForgetStore, useUserStore, userLogin } from '../store/store';

import { signInWithPopup } from "firebase/auth";
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '../customHooks/firebase';
import axiosInstance from '../config/axiosConfig';




interface userGoogle {
    user_id: string;
    name: string,
    email: string,
    picture: string,

}






export default function Login() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [check, setCheck] = useState(false);
    const { setForget } = useForgetStore();
    const navigate = useNavigate();
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const cusToast = useToast();
    const { setUser } = useUserStore();





    const handleCheckboxChange = () => {
        setCheck(!check); // Khi người dùng click vào checkbox, cập nhật trạng thái của nó
    };

    const handleForget = () => {
        setForget(true); // Đặt isForgotten thành true
    };
    let userL: userGoogle;
    const handleClickLoginGG = () => {

        cusToast.showToast("Loading ...", "info");
        localStorage.clear();
        sessionStorage.clear();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Đăng nhập thành công
                toast.dismiss();

                const user = result.user;
                console.log("User:", user);



                if (user.email && !user.email.endsWith('@fpt.edu.vn')) {
                    cusToast.showToast("Bạn chỉ có thể đăng nhập với google bằng tài khoản mail có đuôi @fpt.edu.vn", "error");
                    return;
                } else {
                    user.getIdTokenResult().then(idTokenResult => {
                        userL = jwt(idTokenResult.token);
                        const postData = {
                            fullName: userL.name,
                            email: userL.email,
                            picture: userL.picture
                        };

                        axiosInstance.post('/api/v1/auth/google', postData, {
                            timeout: 5000,
                        })
                            .then(response => {
                                // Xử lý kết quả trả về sau khi gửi request thành công (nếu cần)
                                console.log('Response:', response.data);
                                localStorage.setItem('token', response.data.token);
                                localStorage.setItem('refreshToken', response.data.refreshToken);
                                localStorage.setItem('user', JSON.stringify(userL));
                                navigate("/");
                                cusToast.showToast("Login success", 'success');
                            })
                            .catch(error => {
                                // Xử lý lỗi khi gửi request
                                console.error('Error:', error);
                                cusToast.showToast(error.response.data.message, 'error');
                            });
                        // console.log(userL);
                    });


                }


                cusToast.showToast("Đăng nhập thành công", "success")

                // localStorage.setItem("user", JSON.stringify(userL));
                // setUserGG(userL);

                // navigate("/");

                // Tiếp theo, bạn có thể thực hiện xử lý cho người dùng sau khi đăng nhập ở đây
            })
            .catch((error) => {
                // Xử lý lỗi đăng nhập
                cusToast.dismissToast();
                console.error("Error:", error);
                cusToast.showToast("Login Google error", 'error');
            });
    };



    // Ví dụ về cách sử dụng useEffect để theo dõi trạng thái đăng nhập
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Đã đăng nhập
                console.log("User is signed in:", user);

            } else {
                // Đã đăng xuất
                console.log("User is signed out");
            }
            return () => unsubscribe;
        });

        return () => unsubscribe(); // Hủy theo dõi trạng thái đăng nhập khi component unmounts
    }, []);





    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = userRef.current?.value;
        const password = passwordRef.current?.value;
        const data = {
            username: user,
            password: password,
        };
        cusToast.showToast("Loading ...", "info");
        await axiosInstance
            .post('/api/v1/auth/login', data)
            .then((response) => {
                cusToast.dismissToast();
                console.log(response);
                const userL: userLogin = jwt(response.data.token);
                cusToast.showToast("Đăng nhập thành công", "success")
                { check ? localStorage.setItem('token', response.data.token) : sessionStorage.setItem('token', response.data.token) }
                
                { check ? localStorage.setItem('refreshToken', response.data.refreshToken) : sessionStorage.setItem('refreshToken', response.data.refreshToken) }
                setUser(userL);
                console.log(userL);
                navigate("/");


            })
            .catch((error) => {
                cusToast.dismissToast();
                console.log(error.response);
                cusToast.showToast("Đăng nhập thất bại", "error");
                cusToast.showToast(error.response.data.message, "error");
            })
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    return (
        <>


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
                <div className="form-check form-switch">
                    <input className="form-check-input"
                        checked={check} // Sử dụng giá trị của state để xác định trạng thái của checkbox
                        onChange={handleCheckboxChange}
                        type="checkbox" />
                    <label className="form-check-label" style={{ paddingLeft: "1rem" }}>Ghi nhớ mật khẩu</label>
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
                <a onClick={handleClickLoginGG} style={{ color: "#ffa94d" }}>
                    Google
                </a>

                {/* <GoogleOAuthProvider clientId="673525613876-8si0uta7f5u7iq1po5rsj4lsur972vtj.apps.googleusercontent.com"><GoogleLogin
                    onSuccess={async credentialResponse => {
                        console.log(credentialResponse);
                        const idToken = credentialResponse?.credential;
                        if (idToken) {
                            try {
                                console.log(idToken);
                                const user: userGoogle = jwt(idToken); // decode your token here
                                console.log('Decoded Token: ', user);
                                console.log(user.email);
                                const responsee = await axios.post('https://api.fublog.tech/api/v1/auth/google', {
                                    fullName: user.name,
                                    email: user.email,

                                });

                                if (responsee.status === 200) {
                                    const userL: userLogin = jwt(responsee.data.token);
                                    { check ? localStorage.setItem('user', JSON.stringify(userL)) : sessionStorage.setItem('user', JSON.stringify(userL)); }
                                    setUser(userL);
                                    console.log(userL);
                                    navigate("/");
                                }

                                console.log('Server response: ', responsee.data)
                            } catch (error) {
                                console.log('Error decoding token:', error);
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
                /></GoogleOAuthProvider> */}
                {/* <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={auth}
                /> */}

            </div >
        </>
    );
}
