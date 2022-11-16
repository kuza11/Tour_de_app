import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import rustLogo from '../public/test.jpg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faChartSimple,
	faCalendarDays,
	faList,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
		<div>
			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<nav className={styles.nav}>
				<button className={styles.navButton}><FontAwesomeIcon icon={faChartSimple} /></button>
				<button className={styles.navButton}><FontAwesomeIcon icon={faCalendarDays} /></button>
				<button className={styles.navButton}><FontAwesomeIcon icon={faList} /></button>
			</nav>

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
		</div>
  )
}
