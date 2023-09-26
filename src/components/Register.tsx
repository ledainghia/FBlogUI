import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import jwt from 'jwt-decode';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserStore } from '../store/store';
import CustomToast from '../customHooks/configToast';
import useToast from './CustomToast';
interface userLogin {
    user: string,
    email: string,
    roles: [],
    fullname: string,
    picture: string,

}

export default function Register() {
    const cusToast = useToast();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    // Thêm state để lưu thông báo lỗi và giá trị của trường email
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailValue, setEmailValue] = useState<string>(''); // Giá trị ban đầu là chuỗi rỗng
    const { setUser } = useUserStore();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target?.value;
        setEmailValue(newEmail); // Cập nhật giá trị email

        // Kiểm tra xem email có đúng định dạng không
        const emailPattern = /^[a-zA-Z0-9._-]+@fpt\.edu\.vn$/; // Mẫu email
        if (emailPattern.test(newEmail)) {
            setEmailError('Nếu bạn login bằng mail @fpt.edu.vn thì bạn phải sử dụng đăng nhập bằng google');
            cusToast.showToast("Không thể đăng kí bằng mail @fpt.edu.vn", "error")
            console.log(emailPattern.test(newEmail));
        } else {
            cusToast.dismissToast();
            setEmailError(null); // Xóa thông báo lỗi nếu email hợp lệ
        }
    };

    const handleEmailBlur = () => {
        // Kiểm tra email khi người dùng rời khỏi trường
        const emailPattern = /^[a-zA-Z0-9._-]+@fpt\.edu\.vn$/; // Mẫu email
        if (emailPattern.test(emailValue)) {
            setEmailError('Nếu bạn login bằng mail @fpt.edu.vn thì bạn phải sử dụng đăng nhập bằng google');
            cusToast.showToast("Không thể đăng kí bằng mail @fpt.edu.vn", "error")

        } else {
            cusToast.dismissToast();
            setEmailError(null); // Xóa thông báo lỗi nếu email hợp lệ
        }
    };

    const navigate = useNavigate();

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
            fullName: fullName,
            email: mail,
        };

        cusToast.showToast("Đang xử lý...", "error");

        await axios
            .post('https://api.fublog.tech/api/v1/auth/signup', data)
            .then((response) => {
                console.log(response);
                cusToast.dismissToast();
                const userL: userLogin = jwt(response.data.token);
                cusToast.showToast("Đăng kí thành công", "success");
                localStorage.setItem('user', JSON.stringify(userL));
                setUser(userL);
                console.log(userL);

                navigate("/");
            })
            .catch((error) => {
                cusToast.dismissToast();
                console.log(error.response);
                toast.error(error.response.data + error.reponse.status, {
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

            <CustomToast />
            <div>
                <form
                    action="post"
                    onSubmit={handleSubmitSignup}
                    autoComplete="off"
                >
                    <input className="form-control" ref={fullNameRef} type="text" name="fullname" placeholder="Full Name" required />
                    <input className="form-control" ref={userRef} type="text" name="username" placeholder="User Name" required />
                    <input
                        className="form-control"
                        ref={mailRef}
                        type="email"
                        name="email"
                        placeholder="E-mail Address"
                        required
                        value={emailValue} // Giá trị của trường email
                        onChange={handleEmailChange} // Xử lý khi giá trị thay đổi
                        onBlur={handleEmailBlur} // Xử lý khi người dùng rời khỏi trường
                    />
                    {emailError && (
                        <div className="text-danger">{emailError}</div>
                    )}
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
                {/* <div className="other-links">
                    <span>Or register with</span>
                    <a href="#" style={{ color: "#ffa94d" }}>
                        Google
                    </a>
                </div> */}
            </div>
        </>
    );
}
