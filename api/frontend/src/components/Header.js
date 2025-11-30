import "./header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">Write your own Blogs on...</span>
          <span className="headerTitleLg">Bloggy</span>
        </div>
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/262713/pexels-photo-262713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
    </>
  );
};

export default Header;
