import { Link, useNavigate } from "react-router-dom";
import { useButtonNavRefStore, useUserStore } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavbarStore } from "../store/store";
import NavbarSlid, { page } from "./NavbarSlid";
import LOGO from "../assets/images/logo.svg";
import axiosInstance from "../config/axiosConfig";
import axios from "axios";

import CategoryDropdown from "./CategoriewDropdown";

export interface categories {
    categoryId: number,
    categoryName: string,
    subCategory: categories[],

}
export interface pages {
    id: number,
    name: string,
    url: string,
    subPages: pages[],
}

// const host = "https://api.fublog.tech/push-notifications/4";
export default function Header() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { user, setUser } = useUserStore();
    const navigate = useNavigate();
    const { setButtonNavRef } = useButtonNavRefStore();
    const buttonNavRefs = useRef<HTMLButtonElement>(null);
    const [categories, setCategories] = useState([]);

    // useEffect(() => {




    //     const sse = new EventSource(host);
    //     console.log(sse);
    //     sse.addEventListener("user-list-event", (event) => {
    //         const data = JSON.parse(event.data);

    //     });

    //     sse.onerror = () => {
    //         sse.close();
    //         console.log("data");
    //     };
    //     return () => {
    //         sse.close();
    //         console.log("data2");
    //     };

    // },);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://api.fublog.tech/api/v1/auth/category/viewAll");
                const category = response.data.data;
                setCategories(category);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [setCategories]);

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/auth/getUserInfo");
                console.log("userInfo", response.data);
                console.log("user", user);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();


    }, [setUser]);

    useEffect(() => {
        // Gán giá trị cho buttonNavRef sau khi component đã render
        setButtonNavRef(buttonNavRefs);
    }, [setButtonNavRef]);

    useEffect(() => {
        // Sử dụng window.innerWidth hoặc media queries để kiểm tra kích thước màn hình
        const checkIsMobile = () => {
            if (window.innerWidth <= 987) { // Thay 768 bằng ngưỡng phù hợp cho mobile của bạn
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Gọi hàm kiểm tra lần đầu khi component mount
        checkIsMobile();

        // Lắng nghe sự thay đổi kích thước màn hình
        window.addEventListener('resize', checkIsMobile);

        // Xóa lắng nghe khi component bị hủy
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);




    const { isNavbar, setNavbar } = useNavbarStore();


    const toggleNavbar = () => {
        setNavbar(!isNavbar);
    };


    const handleLogout = () => {
        // Clear the user data in the store
        setUser(null);

        // Remove the user data from localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect the user to the login page
        navigate('/login');
    };





    return (
        <>
            <ToastContainer />
            <NavbarSlid />
            <header className="header-default bg-light sticky-top">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">

                        <Link className="navbar-brand" to="/"><img src={LOGO} alt="logo" /></Link>

                        <div className="collapse navbar-collapse">

                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown active">
                                    <Link className="nav-link dropdown-toggle" to={"/"}>Pages</Link>
                                    <ul className="dropdown-menu">
                                        {page.map((page, index) => (
                                            <li key={index}><Link className="dropdown-item" to={page.url}>{page.name}</Link></li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="category.html">Lifestyle</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="category.html">Inspiration</a>
                                </li>

                                <li className="nav-item dropdown ">
                                    <CategoryDropdown categories={categories} />
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="contact.html">Contact</a>
                                </li>
                            </ul>
                        </div>




                        <div className="header-right">


                            <div className="header-buttons">
                                <div className="header-buttons">
                                    <button className="search icon-button">
                                        <i className="icon-magnifier"></i>
                                    </button>
                                    <button className="icon-button" onClick={() => { navigate('/writepost') }}>
                                        <i className="icon-bell"></i>
                                    </button>
                                    {isMobile && (
                                        <button className="icon-button" onClick={toggleNavbar}>
                                            <i className="icon-menu"></i>
                                        </button>)}
                                    {user ?
                                        <div className="btn-group dropdown-center">
                                            <button type="button" className="btn dropdown-toggle" style={{ color: "orange" }} data-bs-toggle="dropdown" aria-expanded="false">
                                                Hi, {user.fullname}
                                            </button>
                                            <ul className="dropdown-menu" style={{ left: "-20px " }}>
                                                <li><Link className="dropdown-item" to={"/profile"}>Trang cá nhân</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="logout"><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
                                            </ul>
                                        </div>
                                        :
                                        <span className="px-4 login"><Link to={"/login"} className="login">Đăng nhập</Link> </span>}

                                </div>
                            </div>
                        </div>
                    </div>
                </nav >
            </header >



        </>
    )
}
