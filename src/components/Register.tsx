import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const rePasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = userRef.current?.value;
        const password = passwordRef.current?.value;
        const fullName = fullNameRef.current?.value;
        const mail = mailRef.current?.value;
        const rePassword = rePasswordRef.current?.value;

        if (password !== rePassword) {
            toast.error('Passwords do not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return; // Stop the function execution if passwords don't match
        }

        const data = {

            username: user,
            password: password,
            fullname: fullName,
            email: mail,
        };


        await axios
            .post('https://api.fublog.tech/api/signup', data)
            .then((response) => {
                console.log(response);
                toast.success('Đăng kí thành công!', {
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

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
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
            <div>
                <form
                    action="post"
                    onSubmit={handleSubmitSignup}
                    autoComplete="off"
                >
                    <input className="form-control" ref={fullNameRef} type="text" name="fullname" placeholder="Full Name" required />
                    <input className="form-control" ref={userRef} type="text" name="username" placeholder="User Name" required />
                    <input className="form-control" ref={mailRef} type="email" name="email" placeholder="E-mail Address" required />
                    <div className="password-container">
                        <input
                            className="form-control"
                            type={passwordVisible ? "text" : "password"}
                            ref={passwordRef}
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                        />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEyeSlash : faEye}
                            className="fa-eye"
                            onClick={togglePasswordVisibility}

                        />
                    </div>
                    <div className="password-container">
                        <input
                            className="form-control"
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirm-password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            ref={rePasswordRef}
                            required
                        />
                        <FontAwesomeIcon
                            icon={confirmPasswordVisible ? faEyeSlash : faEye}
                            onClick={toggleConfirmPasswordVisibility}
                            className='fa-eye'
                        />
                    </div>
                    <div className="form-button">
                        <button id="submit" type="submit" className="ibtn">
                            Register
                        </button>
                    </div>
                </form>
                <div className="other-links">
                    <span>Or register with</span>
                    <a href="#" style={{ color: "#ffa94d" }}>
                        Google
                    </a>
                </div>
            </div>
        </>
    );
}
