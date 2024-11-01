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
      <h1 className={styles.bgHeader}>Contact Us</h1>
      <p className={styles.bgText}>
        Send us an email on imranhamid83@gmail.com
      </p>
    </>
  );
}
