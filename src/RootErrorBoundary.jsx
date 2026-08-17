import { useRouteError } from "react-router";
import styles from "./RootErrorBoundary.module.css";

export default function RootErrorBoundary() {
  const error = useRouteError();

  console.error("An unexpected route error occurred:", error);

  return (
    <main className={styles.errorPage}>
      <section className={styles.errorContent}>
        <p className={styles.eyebrow}>Something went wrong</p>
        <h1>We couldn&rsquo;t load this page.</h1>
        <p className={styles.message}>
          Please reload the application and try again.
        </p>
        <button
          className={styles.reloadButton}
          type="button"
          onClick={() => window.location.reload()}
        >
          Reload application
        </button>
      </section>
    </main>
  );
}
