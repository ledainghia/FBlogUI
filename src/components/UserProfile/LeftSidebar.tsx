import { useEffect, useRef } from "react";

// helpers
import { getMenuItems } from "../../helpers/menu";

// components

import AppMenu from "../../layouts/Menu";

// images

/* user box */
const UserBox = () => {
  return <></>;
};

/* sidebar content */
const SideBarContent = () => {
  return (
    <>
      <UserBox />

      <div id="sidebar-menu">
        <AppMenu menuItems={getMenuItems()} />
      </div>

      <div className="clearfix" />
    </>
  );
};

const LeftSidebar = () => {
  const menuNodeRef: any = useRef(null);

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <div className="left-side-menu" ref={menuNodeRef}>
      <SideBarContent />
    </div>
  );
};

export default LeftSidebar;
