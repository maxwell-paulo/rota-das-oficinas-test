

import style from "./style.module.css";

export function Navbar() {
  return (
    <div className={style.container}>
    <div className={style.nav}>
        <a href="/" className={style.navbarBrand}>Início</a>

        <a href="/numeros-romanos" className={style.navbarBrand}>Números romano</a>
        <a href="/jogo-da-vida" className={style.navbarBrand}>Jogo da vida</a>
        <a href="/conta" className={style.navbarBrand}>Divisor de conta</a>
</div>

    </div>
  );

}
