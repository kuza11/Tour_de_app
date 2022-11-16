import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faChartSimple,
	faCalendarDays,
	faList,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className={styles.container}>
			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<nav className={styles.nav}>
				<button className={styles.navButton}><FontAwesomeIcon icon={faChartSimple} /></button>
				<button className={styles.navButton}><FontAwesomeIcon icon={faCalendarDays} /></button>
				<button className={styles.navButton}><FontAwesomeIcon icon={faList} /></button>
			</nav>

			<main className={styles.main}>
				<div>Hello</div>
			</main>
		</div>
  )
}
