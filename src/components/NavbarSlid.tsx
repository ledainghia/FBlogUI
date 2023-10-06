import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useToast from '../customHooks/configToast';
import { useButtonNavRefStore, useNavbarStore } from '../store/store';
import { Menu, MenuPage } from './Menu';

const page = [
    {
        "id": 1,
        "name": "Home",
        "url": "/",
        "subPages": [],
    },
    {
        "id": 2,
        "name": "Write blog",
        "url": "/writepost",
        "subPages": [],
    }
]


export default function NavbarSlid() {
    const [categories, setCategories] = useState([]);
    const cusToast = useToast();

    const [subMenus, setSubMenus] = useState<boolean>(false);
    const [subPages, setSubPages] = useState<boolean>(false);
    const { isNavbar, setNavbar } = useNavbarStore();
    const navbarRef = useRef<HTMLDivElement>(null);

    const toggleSubMenu = () => {
        setSubMenus(!subMenus);
    };
    const toggleSubPages = () => {
        setSubPages(!subPages);
    };

    const toggleNavbar = () => {
        setNavbar(!isNavbar);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://api.fublog.tech/api/v1/auth/blogPosts/category/view");
                console.log("category", response);
                const category = response.data.data;
                // cusToast.showToast("Get category successfully", "success");
                console.log("category", category);
                setCategories(category);
            } catch (err) {
                console.error(err);
                //cusToast.showToast(String.toString(err), "error");
            }
        }

        fetchData();






    }, [setCategories]);
    const { buttonNavRef } = useButtonNavRefStore();
    const handleDocumentClick = (e: MouseEvent) => {

        if (isNavbar)
            if (navbarRef.current && !navbarRef.current.contains(e.target as Node) && buttonNavRef && buttonNavRef.current && !buttonNavRef.current.contains(e.target as Node)) {
                setNavbar(false);

            }
    };
    useEffect(() => {

        if (isNavbar) {
            window.addEventListener("click", handleDocumentClick);
        } else {
            window.removeEventListener("click", handleDocumentClick);
        }

        return () => {
            // Đảm bảo remove event listener khi component unmount
            window.removeEventListener("click", handleDocumentClick);
        };
    }, [isNavbar]);
    return (
        <div className={`canvas-menu d-flex align-items-end flex-column ${isNavbar ? "open" : ""} `} ref={navbarRef}>
            {/* <!-- close button --> */}
            <button type="button" className="btn-close" aria-label="Close" onClick={toggleNavbar} ></button>



            {/* <!-- menu --> */}
            <nav className='mt-5'>
                <ul className="vertical-menu">
                    <li className="active">
                        <Link to={"/"}>Pages</Link>
                        <i className=" icon-arrow-down switch"
                            onClick={toggleSubPages}
                            style={{
                                transform: subPages ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s ease' // Thêm thuộc tính transition
                            }}
                        />
                        {subPages ? <MenuPage pages={page} /> : <>  </>}
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
