import {FaGooglePlay, FaGithub, FaLinkedin} from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
  return (<footer className={styles.footer}>
    <ul className={styles.social_list}>
      <li><a href="https://play.google.com/store/apps/developer?id=Bolinho+Tech" target="_blank"><FaGooglePlay/></a></li>
      <li><a href="https://github.com/JoaoGabrielFA" target="_blank"><FaGithub/></a></li>
      <li><a href="https://www.linkedin.com/in/joao-gabriel-fa/" target="_blank"><FaLinkedin/></a></li>
    </ul>
    <p className={styles.copy_right}>
      <span>Costs</span> &copy; 2023
    </p>
  </footer>)
}

export default Footer;