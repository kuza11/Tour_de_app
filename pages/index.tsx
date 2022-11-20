import Head from 'next/head';
import React, { Component } from 'react';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faChevronDown, faEllipsis, faFilter, faHome, faMagnifyingGlass, faPlus, faTag, faTrophy } from '@fortawesome/free-solid-svg-icons';

export function tmp() {
	console.log("Hello");
}

export function openPopup() {
	window.open('https://javascript.info/')
}

export default function Home() {
	return (
		<>

			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<div id={styles.body}>
				<nav id={styles.topBar}>
					<div className={styles.search} >
						<FontAwesomeIcon icon={faMagnifyingGlass} height={"2rem"} />
						<p>Search</p>
					</div>
					
					<div className={styles.filter} >
						<FontAwesomeIcon icon={faFilter} height={"2rem"} />
						<p>Filter</p>
					</div>

					<div className={styles.sort} >
						<FontAwesomeIcon icon={faArrowDownWideShort} height={"2rem"} />
						<p>Sort</p>
					</div>
				</nav>

				<div id={styles.leftBar}>
					<h2 id={styles.leftBarLogo} >Logo</h2>

					<div className={styles.leftBarItem} >
						<FontAwesomeIcon icon={faHome} height={"2rem"} />
						<h2>Home</h2>
					</div>

					<div className={styles.leftBarItem} >
						<FontAwesomeIcon icon={faTrophy} height={"2rem"} />
						<h2>Goals</h2>
					</div>

					<div className={styles.spacer}></div>

					<div className={styles.leftBarItem} >
						<FontAwesomeIcon icon={faTag} height={"2rem"} />
						<h2>Tags</h2>
						<FontAwesomeIcon icon={faChevronDown} height={"1.5rem"} />
					</div>

					<ul id={styles.tags} >
						<li>Tag 1</li>
					</ul>

				</div>

				<main id={styles.main}>

					<div className={styles.record}>
						<h2 className={styles.recordHeader} >Test header</h2>
						<div className={styles.recordLogo} >Logo</div>
						<p className={styles.recordRating} >8/10</p>
						<FontAwesomeIcon icon={faEllipsis} className={styles.recordMenu} />
					</div>



					<div id={styles.addButton}><FontAwesomeIcon icon={faPlus} height={"4rem"} /></div>
				</main>
			</div>

		</>
  );
}


