import { ReactNode, Suspense, useState } from "react";
// import "../components/UserProfile/styles.css";
import Header from "../components/Header";
import LeftSideBar from "../components/UserProfile/LeftSidebar";
import Footer from "../components/Footer";

import { Button, Container } from "react-bootstrap";
type Props = {
  content: ReactNode;
};
export default function User({ content }: Props) {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const openMenu = () => {
    setIsMenuOpened((prevState) => !prevState);

    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };
  return (
    <>
      <Header></Header>

      {/* <div
        className="container-fluid"
        style={{ padding: "0", margin: "0", overflowX: "hidden" }}
      >
        <div className="row">
          <div className="col-md-2 col-xl-1">
            <div>
              
            </div>
          </div>
          <div className="col-md-10 col-xl-11">
           
          </div>
        </div>
      </div> */}
      {/* <Topbar openLeftMenuCallBack={openMenu}></Topbar> */}
      <div id="wrapper">
        <Button
          onClick={openMenu}
          style={{
            borderRadius: "2px",
            background: "none",
            color: "black",
          }}
        >
          {" "}
          <i className="icon-menu" style={{ height: "100px" }}></i>
        </Button>

        <LeftSideBar></LeftSideBar>
        <div className="content-page">
          <div className="content">
            <div></div> <Container fluid>{content}</Container>
          </div>

          <Suspense fallback={"loading()"}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
}
