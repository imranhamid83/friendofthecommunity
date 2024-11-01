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
      <h1 className={styles.bgHeader}>About Us</h1>
      <p className={styles.bgText}>
        We are a group of individuals who want to bring the people together by training, volunteer, bounding, respect and much more. Come and join us in our mission to create communities which can bring change and harmony.
      </p>
    </>
  );
}
