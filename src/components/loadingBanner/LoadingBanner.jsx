import styles from "./LoadingBanner.module.css";

function LoadingBanner() {
  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span className={styles.text}>Loading…</span>
    </div>
  );
}

export default LoadingBanner;
