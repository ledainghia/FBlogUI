import { Link, useNavigate } from "react-router-dom";
import { useButtonNavRefStore, useUserStore, userLogin } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavbarStore } from "../store/store";
import NavbarSlid, { page } from "./NavbarSlid";
import LOGO from "../assets/images/logo.svg";
import axiosInstance from "../config/axiosConfig";
import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import CategoryDropdown from "./CategoriewDropdown";

import { getNoticationByUser } from "../APICall/apiConfig";
import { getUserFromLocalStorage } from "../constants/userLocal";

export interface categories {
  categoryId: number;
  categoryName: string;
  subCategory: categories[];
}
export interface pages {
  id: number;
  name: string;
  url: string;
  subPages: pages[];
}

type notice = {
  notificationId: number;
  content: string;
  isRead: boolean;
  postId: number;
  createdDate: Date;
  userId: number;
};

export default function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const { setButtonNavRef } = useButtonNavRefStore();
  const buttonNavRefs = useRef<HTMLButtonElement>(null);
  const [categories, setCategories] = useState([]);
  const [noticeList, setNoticeList] = useState<notice[]>([]);
  const [countIsNotRead, setCountIsNotRead] = useState<number>(0);

  useEffect(() => {
    const userCurrent: userLogin | null = getUserFromLocalStorage();

    const host = `http://34.101.233.31:8084/push-notifications/${userCurrent?.id}`;
    const fetchData = async () => {
      await fetchEventSource(host, {
        method: "GET",
        headers: {
          Accept: "text/event-stream",
        },
        onopen(res) {
          return new Promise<void>((resolve) => {
            if (res.ok && res.status === 200) {
              console.log("Connection made ", res);
              resolve();
            } else if (res.status >= 400 && res.status < 500) {
              console.log("Client error ", res);
              resolve();
            } else {
              // console.log("Server error ", res);
              resolve();
            }
          });
        },
        async onmessage(event) {
          // console.log("Message received ", event);
          const data: [] = JSON.parse(event.data);
          if (data.length > 0) {
            const response = await getNoticationByUser(
              userCurrent?.id.toString()
            );
            console.log("noticeList", response.data.data);
            setNoticeList(response.data.data);
            console.log(noticeList);
            const countNotRead = response.data.data.reduce(
              (count: number, notice: notice) => {
                if (!notice.isRead) {
                  return count + 1;
                }
                return count;
              },
              0
            );
            setCountIsNotRead(countNotRead);
            console.log("countNotRead", countIsNotRead);
          }
        },
        onerror(error) {
          console.log("Error occurred ", error);
        },
      });
    };
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.fublog.tech/api/v1/auth/category/viewAll"
        );
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
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [setUser]);

  useEffect(() => {
    setButtonNavRef(buttonNavRefs);
  }, [setButtonNavRef]);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth <= 987) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const { isNavbar, setNavbar } = useNavbarStore();

  const toggleNavbar = () => {
    setNavbar(!isNavbar);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <NavbarSlid />
      <header className="header-default bg-light sticky-top">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={LOGO} alt="logo" />
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown active">
                  <Link className="nav-link dropdown-toggle" to={"/"}>
                    Pages
                  </Link>
                  <ul className="dropdown-menu">
                    {page.map((page, index) => (
                      <li key={index}>
                        <Link className="dropdown-item" to={page.url}>
                          {page.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="category.html">
                    Lifestyle
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="category.html">
                    Inspiration
                  </a>
                </li>

                <li className="nav-item dropdown ">
                  <CategoryDropdown categories={categories} />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="header-right">
              <div className="header-buttons">
                <div className="header-buttons">
                  <button className="search icon-button">
                    <i className="icon-magnifier"></i>
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => {
                      navigate("/writepost");
                    }}
                  >
                    <i className="icon-bell"></i>
                  </button>
                  {isMobile && (
                    <button className="icon-button" onClick={toggleNavbar}>
                      <i className="icon-menu"></i>
                    </button>
                  )}
                  {user ? (
                    <div className="btn-group dropdown-center">
                      <button
                        type="button"
                        className="btn dropdown-toggle"
                        style={{ color: "orange" }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Hi, {user.fullName}
                      </button>
                      <ul className="dropdown-menu" style={{ left: "-20px " }}>
                        <li>
                          <Link className="dropdown-item" to={`/user/mywall`}>
                            Trang cá nhân
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li className="logout">
                          <a className="dropdown-item" onClick={handleLogout}>
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <span className="px-4 login">
                      <Link to={"/login"} className="login">
                        Đăng nhập
                      </Link>{" "}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
