import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái của password (ẩn hoặc hiển thị)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Khi bấm vào icon, chuyển đổi trạng thái
    };

    return (
        <div>
            <form>
                <input className="form-control" type="text" name="username" placeholder="User name" required />
                <div className="password-container">
                    <input
                        className="form-control"
                        type={passwordVisible ? "text" : "password"} // Sử dụng trạng thái để xác định loại input
                        name="password"
                        id="password"
                        placeholder="Password"
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
                    <a href="forget7.html">Forget password?</a>
                </div>
            </form>
            <div className="other-links">
                <span>Hoặc đăng nhập bằng</span>
                <a href="#" style={{ color: "#ffa94d" }}>
                    Google
                </a>
            </div>
        </div>
    );
}
