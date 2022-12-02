import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import LeftBar from '../styles/LeftBar.module.css';
import Record from '../styles/Record.module.css';
import Modals from '../styles/Modals.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faClose, faEllipsis, faHome, faMagnifyingGlass, faPlus, faTag, faTrophy, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import ReactModal from 'react-modal';

let tags = ["tag1", "tag2", "tag3"];

function Tags() {
	return (
		<>
			{tags.map((e, index) => (
				<li key={index} className={LeftBar.tag} >{e}</li>
			))}
		</>
	);
}

let author = {logo: "Logo"};
let records = [{header: "Header1", language: "Rust", time: 2.18, progress: "8", author: author}, { language: "C", time: 1.8, progress: "9", author: author}, {language: "C++", time: 3.75, progress: "5", author: author}];

function RecordDivs() {
	const [modalOpen, setModalOpen] = useState(-1);

	return (
		<>
      {records.map((e, index) => (
        <div key={index} className={styles.record} onClick={() => setModalOpen(index)} >
          <h2 className={Record.header}>{e.language} - {e.time}h</h2>
					<div className={Record.logo}>{e.author.logo}</div>
					<p className={Record.rating}>{e.progress}/10</p>
        </div>
      ))}

			<ReactModal isOpen={modalOpen >= 0} className={Record.modal} >

				<div className={Modals.buttons} >
					<FontAwesomeIcon icon={faEllipsis} />
					<FontAwesomeIcon icon={faX} onClick={() => setModalOpen(-1)}/>
				</div>

				<div className={Modals.header} >
					<h2>{records[modalOpen]?.header}</h2>
					<h3>{records[modalOpen]?.language}</h3>
				</div>

				<div className={Modals.body} >
					<h4>{records[modalOpen]?.progress}/10</h4>
				</div>

				<p className={Modals.time} >{records[modalOpen]?.time}h</p>

				<div className={Modals.progressBar} >
					<div className={Modals.progressBarFiller} >20%</div>
				</div>

			</ReactModal>
		</>
  );
}

export default function Home() {
	const [addOpen, setAddOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [registerOpen, setRegisterOpen] = useState(false);

	return (
		<>

			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<div id={styles.body}>
				<nav id={styles.topBar}>
					<div>
						<FontAwesomeIcon icon={faMagnifyingGlass} height={"2rem"} />
						<p>Search</p>
					</div>
					
					<div>
						<FontAwesomeIcon icon={faArrowDownWideShort} height={"2rem"} />
						<p>Sort</p>
					</div>
				</nav>

				<div id={styles.leftBar}>
					<div className={LeftBar.Items} >Logo</div>

					<Link className={[LeftBar.Items, LeftBar.homeGoalLink].join(" ")} href="/" >
						<FontAwesomeIcon icon={faHome} height={"2rem"} />
						<h2>Home</h2>
					</Link>

					<Link className={[LeftBar.Items, LeftBar.homeGoalLink].join(" ")} href="/goals" >
						<FontAwesomeIcon icon={faTrophy} height={"2rem"} />
						<h2>Goals</h2>
					</Link>

					<div id={LeftBar.Spacer} ></div>

					<div className={LeftBar.Items} >
						<FontAwesomeIcon icon={faTag} height={"2rem"} />
						<h2>Tags</h2>
						<FontAwesomeIcon icon={faPlus} height={"2rem"} />
					</div>

					<ul>
						<Tags/>
					</ul>

					<div className={LeftBar.Items} onClick={() => setLoginOpen(true)} >
						<FontAwesomeIcon icon={faUser} height={"2rem"} />
						<h3>Sign in</h3>
					</div>

				</div>

				<main id={styles.main} >

					<RecordDivs/>

				</main>

				<div id={styles.addButton} onClick={() => setAddOpen(true)} ><FontAwesomeIcon icon={faPlus} height={"4rem"} /></div>

			</div>

			<ReactModal isOpen={addOpen} className={styles.modal} >
				<form action='/api/form' method="post" className={styles.form} >
					<label htmlFor='Header'>Header</label>
					<input id="header" name="header" required />

					<label htmlFor="description">Description</label>
					<input id="description" name="description" required />

					<label htmlFor="rating" >Rate</label>
					<input type="range" min="0" max="10" id="rating" name="rating" required className={styles.nm} />

					<button type="submit">Submit</button>
					<button	onClick={() => setAddOpen(false)} className={styles.closeButton} >X</button>
				</form>
			</ReactModal>

			<ReactModal isOpen={loginOpen} className={Modals.modal} >
				<form action='.......' className={Modals.form} >
					<h2>Online Deník</h2>

					<div className={Modals.inputField} >
						<label htmlFor='Username'>Username</label>
						<input className={Modals.input} id="username" name="username" required />
					</div>

					<div className={Modals.inputField} >
						<label htmlFor='Password'>Password</label>
						<input className={Modals.input} id="password" name="password" type={'password'} required />
					</div>

					<div className={Modals.confirmation} >
						<button type="submit" className={Modals.login} >Create account</button>
						<p>Don't have an account yet?</p>
						<p className={Modals.link} onClick={() => {setRegisterOpen(true); setLoginOpen(false)}}>Register now!</p>
					</div>

					<FontAwesomeIcon icon={faClose} onClick={() => setLoginOpen(false)} className={styles.closeButton} />
				</form>
			</ReactModal>

			<ReactModal isOpen={registerOpen} className={Modals.modal} >
				<form action='.......' className={Modals.form} >
					<h2>Online Deník</h2>

					<div className={Modals.inputField} >
						<label htmlFor='Username'>Username</label>
						<input className={Modals.input} id="username" name="username" required />
					</div>

					<div className={Modals.inputField} >
						<label htmlFor='Password'>Password</label>
						<input className={Modals.input} id="password" name="password" type={'password'} required />
					</div>

					<div className={Modals.confirmation} >
						<button type="submit" className={Modals.login} >Log in</button>
						<p>Already have an account?</p>
						<p className={Modals.link} onClick={() => {setRegisterOpen(false); setLoginOpen(true)}}>Log in!</p>
					</div>


					<FontAwesomeIcon icon={faClose} onClick={() => setRegisterOpen(false)} className={styles.closeButton} />

				</form>
			</ReactModal>

		</>
  );
}
