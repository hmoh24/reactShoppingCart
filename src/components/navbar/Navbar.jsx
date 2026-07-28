import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav role="navigation">
      <p>Logo</p>
      <ul class={styles.navLinks}>
        <li>
          <a href="">Link 1</a>
        </li>
        <li>
          <a href="">Link 2</a>
        </li>
        <li>
          <a href="">Link 3</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
