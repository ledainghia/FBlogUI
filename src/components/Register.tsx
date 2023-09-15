import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div>
            <form>
                <input className="form-control" type="text" name="name" placeholder="Full Name" required />
                <input className="form-control" type="text" name="name" placeholder="User Name" required />
                <input className="form-control" type="email" name="email" placeholder="E-mail Address" required />
                <div className="password-container">
                    <input
                        className="form-control"
                        type={passwordVisible ? "text" : "password"}
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
    );
}
