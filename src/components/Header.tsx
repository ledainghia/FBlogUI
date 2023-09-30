import { Link } from "react-router-dom";
import { useUserStore } from "../store/store";
import { useNavigate } from 'react-router-dom';
// import { Navbar, Nav, Button, Collapse, Container, Dropdown, NavDropdown } from 'react-bootstrap';
import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
export default function Header() {

    const { user, setUser } = useUserStore();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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

        <header className="header-default sticky-top bg-light">
            <Navbar expand="lg ">
                <Container fluid="xl ">
                    <Navbar.Brand as={Link} to="/">
                        <img src="images/logo-color.svg" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarCollapse" />
                    <Navbar.Collapse id="navbarCollapse">
                        <Nav className="mr-auto ">
                            <NavDropdown title="Category" id="category-dropdown" className="active">
                                <NavDropdown.Item as={Link} to="/category/kt-pm">Kĩ Thuật Phần Mềm</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/category/at-tt">An Toàn Thông Tin</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/category/ttnn">Trí Tuệ Nhân Tạo</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/category/classic">Classic</NavDropdown.Item>
                                <NavDropdown title="Nested Dropdown" id="nested-dropdown">
                                    <NavDropdown.Item as={Link} to="/category/nested1">Nested 1</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/category/nested2">Nested 2</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/category/nested3">Nested 3</NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                            <Nav.Item as={Link} to="/about" className="nav-link">
                                About
                            </Nav.Item>
                            <Nav.Item as={Link} to="/inspiration" className="nav-link">
                                Inspiration
                            </Nav.Item>
                            <NavDropdown title="Pages" id="pages-dropdown">
                                <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/pages/blog-single">Blog Single</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/pages/blog-single-alt">Blog Single Alt</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/pages/about">About</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/pages/contact">Contact</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Collapse className="header-right justify-content-end mt-4 mb-4">
                            <div className="header-buttons">
                                <div className="header-buttons">
                                    <button className="search icon-button">
                                        <i className="icon-magnifier"></i>
                                    </button>
                                    <button className="icon-button" onClick={() => { navigate('/writepost') }}>
                                        <i className="icon-note"></i>
                                    </button>
                                    {/* <!-- <button className="burger-menu icon-button">
                   <span className="burger-icon"></span>
                 </button> --> */}
                                    {user ?
                                        <div className="btn-group dropdown-center">
                                            <button type="button" className="btn dropdown-toggle" style={{ color: "orange" }} data-bs-toggle="dropdown" aria-expanded="false">
                                                Hi, {user.fullname}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to={"/profile"}>Trang cá nhân</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="logout"><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
                                            </ul>
                                        </div>
                                        :
                                        <span className="px-4 login"><Link to={"/login"} className="login">Đăng nhập</Link> </span>}
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header >

    )
}
