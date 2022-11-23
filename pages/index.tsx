import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faChevronDown, faEllipsis, faFilter, faHome, faMagnifyingGlass, faPlus, faTag, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from '../components/modal';

let clicks = 0;

function addClick() {
	clicks++;
}

let records = [{header: "Header1", logo: "Logo1", rating: "Rating1"}, {header: "Header2", logo: "Logo2", rating: "Rating2"}, {header: "Header3", logo: "Logo3", rating: "Rating3"}];

function RecordDivs() {
	for (let i = 0; i < clicks; i++) {
	}

	return (
		<main>
      {records.map((e, index) => (
        <div key={index} className={styles.record}>
          <h2 className={styles.recordHeader}>{e.header}</h2>
					<div className={styles.recordLogo}>{e.logo}</div>
					<p className={styles.recordRating}>{e.rating}</p>
					<FontAwesomeIcon icon={faEllipsis} className={styles.recordMenu} />
        </div>
      ))}
		</main>
  );
}

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);

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

				<main id={styles.main} >

					<RecordDivs/>

					<Modal isOpen={modalOpen}/>

				</main>

				<div id={styles.addButton} onClick={() => setModalOpen(true)} ><FontAwesomeIcon icon={faPlus} height={"4rem"} /></div>

			</div>

		</>
  );
}
