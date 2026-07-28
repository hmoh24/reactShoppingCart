import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Sterling Sculptures</h1>
        <p className={styles.heroText}>
          The world's leading ancient art broker
        </p>
        <button type="button">Gallery</button>
      </section>
      <section className={styles.about}>
        <h2 className={styles.sectionTitle}>About</h2>
        <div className={styles.placeholder}>
          <p className={styles.contentText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A tempora
            facilis possimus harum id deserunt amet aut illo, corrupti
            praesentium minus consequatur labore quod saepe temporibus
            necessitatibus. Nam quod nihil distinctio, laboriosam eveniet
            praesentium aperiam accusamus natus dignissimos, maxime doloribus
            est alias quidem atque vero enim sed! Reiciendis, distinctio cum.
            Sapiente molestiae voluptatum saepe qui numquam nemo? Veritatis
            praesentium eos possimus aliquid necessitatibus dolores accusamus?
            Rem repudiandae beatae temporibus? Earum quos sit itaque nostrum
            tempore quas corporis. Perspiciatis fuga asperiores earum quibusdam?
            Asperiores exercitationem labore voluptatibus excepturi, laboriosam
            adipisci, atque dolore nemo veniam in quis iure? Nesciunt sed
            reprehenderit ipsum doloremque, officiis eum iure ea harum nam
            sapiente dignissimos? Similique quisquam laboriosam enim voluptatem
            iste inventore voluptatibus cum eos quis! Et quo repudiandae
            consequuntur soluta sequi consectetur est corporis, vero
            exercitationem iure cumque repellendus doloribus nulla libero non,
            natus suscipit quia accusamus eveniet. Asperiores beatae praesentium
            magni nobis sit magnam recusandae, dolores nemo iusto corporis
            perferendis vel pariatur ipsa voluptate veritatis accusamus odio?
            Cum, laboriosam deleniti mollitia iste tempore ut id nemo corrupti
            nostrum blanditiis quas facilis officiis neque rerum laudantium eos
            iusto tenetur pariatur? Accusamus dolorum porro nostrum esse aliquid
            quo rem, commodi quibusdam eveniet asperiores. Reprehenderit,
            laborum culpa.
          </p>
        </div>
      </section>
      <section className={styles.popular}>
        <h2 className={styles.sectionTitle}>Most Popular pieces</h2>
        <div className={styles.placeholder}>
          <p className={styles.contentText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A tempora
            facilis possimus harum id deserunt amet aut illo, corrupti
            praesentium minus consequatur labore quod saepe temporibus
            necessitatibus. Nam quod nihil distinctio, laboriosam eveniet
            praesentium aperiam accusamus natus dignissimos, maxime doloribus
            est alias quidem atque vero enim sed! Reiciendis, distinctio cum.
            Sapiente molestiae voluptatum saepe qui numquam nemo? Veritatis
            praesentium eos possimus aliquid necessitatibus dolores accusamus?
            Rem repudiandae beatae temporibus? Earum quos sit itaque nostrum
            tempore quas corporis. Perspiciatis fuga asperiores earum quibusdam?
            Asperiores exercitationem labore voluptatibus excepturi, laboriosam
            adipisci, atque dolore nemo veniam in quis iure? Nesciunt sed
            reprehenderit ipsum doloremque, officiis eum iure ea harum nam
            sapiente dignissimos? Similique quisquam laboriosam enim voluptatem
            iste inventore voluptatibus cum eos quis! Et quo repudiandae
            consequuntur soluta sequi consectetur est corporis, vero
            exercitationem iure cumque repellendus doloribus nulla libero non,
            natus suscipit quia accusamus eveniet. Asperiores beatae praesentium
            magni nobis sit magnam recusandae, dolores nemo iusto corporis
            perferendis vel pariatur ipsa voluptate veritatis accusamus odio?
            Cum, laboriosam deleniti mollitia iste tempore ut id nemo corrupti
            nostrum blanditiis quas facilis officiis neque rerum laudantium eos
            iusto tenetur pariatur? Accusamus dolorum porro nostrum esse aliquid
            quo rem, commodi quibusdam eveniet asperiores. Reprehenderit,
            laborum culpa.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
