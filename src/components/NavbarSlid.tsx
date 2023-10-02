import { useEffect, useRef, useState } from 'react'
import { Menu } from './Menu'
import axios from 'axios';
import useToast from '../customHooks/configToast';
import { useNavbarStore } from '../store/store';

export default function NavbarSlid() {
    const [categories, setCategories] = useState([]);
    const cusToast = useToast();
    const navbarRef = useRef(null);
    const [subMenus, setSubMenus] = useState<boolean>(false);
    const { isNavbar, setNavbar } = useNavbarStore();
    const toggleSubMenu = () => {
        setSubMenus(!subMenus);
    };

    const toggleNavbar = () => {
        setNavbar(!isNavbar);
    };
    useEffect(() => {
        axios.get("https://api.fublog.tech/api/v1/auth/blogPosts/category/view")
            .then(response => {
                console.log("category", response);
                const category = response.data.data;
                cusToast.showToast("Get category successfully", "success");
                console.log("category", category);
                setCategories(category);
                // setUser(response.data);
            })
            .catch(err => {
                console.log(err);
                cusToast.showToast(err, "error");

            })
    }, [setCategories]);
    return (
        <div className={`canvas-menu d-flex align-items-end flex-column ${isNavbar ? "open" : ""} `} ref={navbarRef}>
            {/* <!-- close button --> */}
            <button type="button" className="btn-close" aria-label="Close" onClick={toggleNavbar} ></button>



            {/* <!-- menu --> */}
            <nav>
                <ul className="vertical-menu">
                    <li className="active">
                        <a href="index.html">Home</a>

                    </li>
                    <li>
                        <a href="category.html">Category</a>
                        <i className=" icon-arrow-down switch"
                            onClick={toggleSubMenu}
                            style={{
                                transform: subMenus ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s ease' // Thêm thuộc tính transition
                            }}
                        />
                        {subMenus ? <Menu categories={categories} /> : <></>}

                    </li>
                    <li><a href="category.html">Inspiration</a></li>
                    <li>
                        <a href="#">Pages</a>
                        <i className=" icon-arrow-down switch" />

                    </li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>

            {/* <!-- social icons --> */}
            <ul className="social-icons list-unstyled list-inline mb-0 mt-auto w-100">
                <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-pinterest"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-medium"></i></a></li>
                <li className="list-inline-item"><a href="#"><i className="fab fa-youtube"></i></a></li>
            </ul>
        </div>
    )
}
