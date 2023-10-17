// import { useState } from "react";
// import { Link } from "react-router-dom";
// import classNames from "classnames";

// // actions

// // constants
// import { LayoutTypes } from "../../constants/layout";

// // // hooks

// // dummy data

// // images
// // import logoSm from '../../assets/images/logo-sm.png';
// // import avatar1 from '../../assets/images/users/user-1.jpg';
// // import logoDark from '../../assets/images/logo-dark.png';
// // import logoLight from '../../assets/images/logo-light.png';

// type TopbarProps = {
//   openLeftMenuCallBack: () => void;
//   containerClass?: string;
// };

// const Topbar = ({ openLeftMenuCallBack, containerClass }: TopbarProps) => {
//   const [isopen, setIsopen] = useState<boolean>(false);

//   /**
//    * Toggle the leftmenu when having mobile screen
//    */
//   const handleLeftMenuCallBack = () => {
//     setIsopen(!isopen);
//     if (openLeftMenuCallBack) openLeftMenuCallBack();
//   };

//   /**
//    * Toggles the right sidebar
//    */
//   //   const handleRightSideBar = () => {
//   //     dispatch(showRightSidebar());
//   //   };

//   return (
//     <div className="navbar-custom">
//       <div className={containerClass}>
//         {/* <ul className="list-unstyled topnav-menu float-end mb-0">
//                     <li className="d-none d-lg-block">
//                         <TopbarSearch options={searchOptions} />
//                     </li>

//                     <li className="dropdown d-inline-block d-lg-none">
//                         <SearchDropdown />
//                     </li>
//                     <li className="dropdown notification-list topbar-dropdown">
//                         <NotificationDropdown notifications={notifications} />
//                     </li>
//                     <li className="dropdown notification-list topbar-dropdown">

//                         <ProfileDropdown userImage={avatar1} username={'Nowak'} menuItems={profileMenus} />
//                     </li>
//                     <li className="dropdown notification-list">
//                         <ThemeSetting handleRightSideBar={handleRightSideBar} />
//                     </li>
//                 </ul> */}

//         {/* LOGO  */}
//         {/* <div className="logo-box">
//           <Link to="/" className="logo logo-dark text-center">
//             <span className="logo-sm">
//               <img alt="logo-sm" height="22" />
//             </span>
//             <span className="logo-lg">
//               <img alt="logo-dark" height="16" />
//             </span>
//           </Link>

//           <Link to="/" className="logo logo-light text-center">
//             <span className="logo-sm">
//               <img alt="logo-sm" height="22" />
//             </span>
//             <span className="logo-lg">
//               <img alt="logo-light" height="16" />
//             </span>
//           </Link>
//         </div> */}

//         <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
//           <>
//             {/* Mobile menu toggle (Vertical Layout) */}
//             <li onClick={handleLeftMenuCallBack}>
//               <button className="button-menu-mobile disable-btn waves-effect">
//                 <i className="fe-menu"></i>
//               </button>
//             </li>
//           </>

//           {"vertical" === LayoutTypes.LAYOUT_VERTICAL && (
//             <li>
//               <h4 className="page-title-main">cc</h4>
//             </li>
//           )}
//         </ul>

//         <div className="clearfix"></div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
