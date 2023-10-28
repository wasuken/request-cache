"use client";
import styles from "./Top.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
	<h1 className={styles.title}>Request Cache</h1>
	<div>
	  <div className={styles.linkContainer}>
	    <div className={styles.icon}>✏️</div>
	    <a className={styles.link} href="/timing">
	      timing
	    </a>
	  </div>
	  <div className={styles.linkContainer}>
	    <div className={styles.icon}>📓</div>
	    <a className={styles.link} href="/queue">
	      queue
	    </a>
	  </div>
	</div>
      </div>
    </div>
  );
};

export default Page;
