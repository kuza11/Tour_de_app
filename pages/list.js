import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import rustLogo from '../public/rust_logo.jpg';

export default function List() {
  return (
		<>
			<Head>
				<title>Tréninkový deník pro programátory | List</title>
			</Head>

			<main className={styles.main}>

				<div className={styles.titleDiv}>
					<h2>Currently learning:</h2>
					<button>Sort by</button>
				</div>

				<div className={styles.container}>
					<div className={styles.langDiv}>
						<Image src={rustLogo} width={80} height={80} alt={"Rust Image"}/>
						<p>Rust</p>
						<p>3h</p>
					</div>

					<div className={styles.langDiv}>
						<Image src={rustLogo} width={80} height={80} alt={"Rust Image"}/>
						<p>Rust</p>
						<p>3h</p>
					</div>

					<div className={styles.langDiv}>
						<Image src={rustLogo} width={80} height={80} alt={"Rust Image"}/>
						<p>Rust</p>
						<p>3h</p>
					</div>

				</div>
			</main>
		</>
  )
}
