

import style from "./style.module.css";

export function Navbar() {
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <Link to={"/"}>
          <img src={logo} alt="siteLogo" className={style.img} />
        </Link>
        <SearchBar />
        <div className={style.links}>
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <Link to={`/add-cromo`}>
            <p>Colar cromo</p>
          </Link>
          <Link to={`/about-us`}>
            <p>Sobre</p>
          </Link>
        </div>

      </div>
    </div>
  );

}
