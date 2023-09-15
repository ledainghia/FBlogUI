

import Login from './Login';
import { useState } from 'react';
import Register from './Register';


export default function LoginContent() {
    const [isLogin, setIsLogin] = useState(true);



    return (
        <div className="form-holder">
            <div className="form-content">
                <div className="form-items">
                    <h3>Chào mừng sự trở lại</h3>
                    <p>
                        Cảm ơn bạn đã đến với FuBlog. Cộng đồng coder lớn nhất FPTU!
                    </p>
                    <div className="page-links">
                        <a onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>Đăng nhập</a><a onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>Đăng kí</a>
                    </div>
                    {isLogin ? <Login /> : <Register />}
                </div>
            </div>
        </div>
    )
}
