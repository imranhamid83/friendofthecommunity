import Image from "next/image";
import ourStoryPic from "/public/images/home-image-1.jpg";
import styles from "./home.module.css";

export default function Page() {
  return (
    <>
      <div className={styles.bgWrap}>
        <Image
          src={ourStoryPic}
          alt="Out story pic"
          placeholder="blur"
          quality={100}
          sizes="100vw"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles.contentOverlay}>
        <h1 className={styles.bgHeader}>About Us</h1>
        <p className={styles.bgText}>
        We are a vibrant and diverse group of local Muslims who share a common vision: to uplift our community through faith, service, and unity. Comprised of professionals from various walks of life, including healthcare, education, technology, and business, we are united by a deep sense of responsibility to give back and build a stronger, more compassionate society.
        </p>
        <p className={styles.bgText}>
        Rooted in Islamic values of justice, compassion, and community service. We strive to be a source of support for our neighbours, a hub for meaningful connection, and a platform for positive change. Whether it is through educational programs, charitable initiatives, or community events, our goal is to foster a spirit of cooperation and shared growth.
        </p>
        <p className={styles.bgText}>
        We believe that by working together across cultures, backgrounds, and professions, we can address the real needs of our local community and build a future that reflects the best of who we are.
        </p>
      </div>
    </> 
  );
}
