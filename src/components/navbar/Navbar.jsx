import styles from "./Navbar.module.css";
import { NavLink } from "react-router";
import logo from "../../assets/floating-archive-logo-v3.png";

function Navbar({ cartItemAmount }) {
  return (
    <nav className={styles.navbar} role="navigation">
      <NavLink to="/" end>
        <img
          className={styles.logo}
          src={logo}
          alt="The Floating Archive home"
        />
      </NavLink>
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
        <li>
          <ul>Cart Items: {cartItemAmount}</ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
