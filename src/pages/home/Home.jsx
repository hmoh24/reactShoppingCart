import styles from "./Home.module.css";
import { useState } from "react";
import { NavLink } from "react-router";

function Home() {
  const [carouselImages, setCarouselImages] = useState([
    "https://images.metmuseum.org/CRDImages/as/original/DP141282.jpg",
    "https://images.metmuseum.org/CRDImages/as/original/LC-1975_268_139_cc-001.jpg",
    "https://images.metmuseum.org/CRDImages/as/original/DP124583.jpg",
  ]);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const carouselMaximum = 2;
  const carouselMinimum = 0;

  function changeCarouselImage(direction) {
    let changeValue;
    if (direction === "next") changeValue = 1;
    if (direction === "previous") changeValue = -1;
    setCarouselPosition((prev) => {
      if (prev + changeValue > carouselMaximum) return carouselMinimum;
      if (prev + changeValue < carouselMinimum) return carouselMaximum;
      return prev + changeValue;
    });
  }

  return (
    <main className={styles.homePage}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>The Floating Archive</h1>
        <p className={styles.heroText}>Art for the quiet spaces within</p>
        <NavLink className={styles.heroButton} to="/products/1" end>
          Products
        </NavLink>
        <img className={styles.sectionImage} src="" alt="" />
      </section>
      <section className={styles.about}>
        <h2 className={styles.sectionTitle}>About The Floating Archive</h2>
        <div className={styles.contentRow}>
          <div className={styles.contentTextContainer}>
            <p className={styles.contentText}>
              The Floating Archive is an independent art house dedicated to
              connecting curious collectors with remarkable works from across
              history. We believe collecting should begin with a story, not a
              sales pitch, so every piece in our gallery is presented with clear
              information about its maker, period, and cultural setting.
            </p>
          </div>
          <div className={styles.sectionImageContainer}>
            <img className={styles.sectionImage} src="" alt="" />
          </div>
        </div>
      </section>
      <section className={styles.japaneseArt}>
        <h2 className={styles.sectionTitle}>The Art of Ukiyo-e</h2>
        <div className={styles.contentRow}>
          <div className={styles.sectionImageContainer}>
            <img className={styles.sectionImage} src="" alt="" />
          </div>
          <div className={styles.contentTextContainer}>
            <p className={styles.contentText}>
              Ukiyo-e, often translated as “pictures of the floating world,”
              flourished in Japan during the Edo period, from the seventeenth to
              the nineteenth century. The “floating world” was the vibrant,
              fleeting culture of Japan’s growing cities: kabuki theatres,
              teahouses, fashionable figures, celebrated actors, and seasonal
              pleasures. Artists also turned their attention to travel and the
              natural world, transforming rainstorms, moonlit rivers, mountains,
              and busy roads into images that could feel both immediate and
              timeless.
            </p>
            <p className={styles.contentText}>
              A print was rarely the work of one pair of hands. An artist
              produced the design, a skilled carver cut it into cherrywood
              blocks, and a printer applied each colour from a separate block
              before pressing the paper by hand. A publisher financed and
              distributed the finished work. This collaborative process made it
              possible to produce hundreds or even thousands of impressions,
              bringing sophisticated images to a much wider audience than a
              unique painting could reach. Small differences in ink, pressure,
              and wear also meant that no two impressions were perfectly
              identical.
            </p>
            <p className={styles.contentText}>
              In their own time, ukiyo-e prints were popular culture as much as
              fine art—part portrait, advertisement, travel souvenir, and visual
              storytelling. Masters such as Hokusai and Hiroshige pushed the
              form toward daring viewpoints, bold outlines, and striking areas
              of colour. When Japanese prints circulated more widely in Europe
              during the nineteenth century, their unusual compositions helped
              reshape the work of Western artists. What began as imagery of an
              ever-changing urban world became one of Japan’s most enduring
              artistic legacies.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.popular}>
        <h2 className={styles.sectionTitle}>Featured Works</h2>
        <div className={styles.carousel}>
          <h3 className={styles.carouselTitle}>
            Placeholder Title for Ukiyo-e
          </h3>
          <img
            src={carouselImages[carouselPosition]}
            alt=""
            className={styles.carouselImage}
          />
          <button
            type="button"
            className={styles.carouselButton}
            onClick={() => changeCarouselImage("next")}
          >
            +
          </button>
          <button
            type="button"
            className={styles.carouselButton}
            onClick={() => changeCarouselImage("previous")}
          >
            -
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
