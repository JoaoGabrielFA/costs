import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "./NavBar.module.css";
import logo from "../../img/costs_logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link id="coin" to="/costs" className={styles.coin}>
            <img src={logo} alt="Costs Logo" />
            <label htmlFor="coin">Costs</label>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}><Link to="/costs/">Home</Link></li>
          <li className={styles.item}><Link to="/costs/projects">Projetos</Link></li>
          <li className={styles.item}><Link to="/costs/company">Empresa</Link></li>
          <li className={styles.item}><Link to="/costs/contact">Contato</Link></li>
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar;