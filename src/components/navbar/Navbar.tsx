import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>FuBlog Admin</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/330207312_1612253192555700_4300040990815671119_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZhjYYD7wLikAX8pTBnU&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfDQd906J59uNA5ipeCHxDV7D7dW4aEkFxtM0_Wj7KfqKA&oe=654325E7"
            alt=""
          />
          <span>Hau</span>
        </div>
        <img src="settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
