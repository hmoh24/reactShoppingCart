import styles from "./Navbar.module.css";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className={styles.navbar} role="navigation">
      <p>Logo</p>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products/1" end>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" end>
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
