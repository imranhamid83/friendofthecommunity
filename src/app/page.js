import Link from "next/link";
import Image from "next/image";
import ourStoryPic from "/public/images/home-image-1.jpg";
import styles from "./rootStyle.module.css";
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
      <h1 className={styles.bgHeader}>Welcome to the Friends of the Community</h1>
      <p className={styles.bgText}>
       We bring people together to create wonderful communities
      </p>
    </>
  );
}
