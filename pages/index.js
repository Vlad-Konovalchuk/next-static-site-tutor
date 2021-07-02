import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <h2>Hello</h2>
    </div>
  );
}
