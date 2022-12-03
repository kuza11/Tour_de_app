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
				<li className={LeftBar.tag} key={index} ><button>{e}</button></li>
			))}
		</>
	);
}

let author = {logo: "Logo"};
let records = [{header: "Header1", language: "Rust", time: 2.18, progress: "8", author: author}, { language: "C", time: 1.8, progress: "9", author: author}, {language: "C++", time: 3.75, progress: "5", author: author}];
let pressed = -1;

function RecordDivs() {
	const [modalOpen, setModalOpen] = useState(-1);

	return (
		<>
      {records.map((e, index) => (
        <button key={index} className={Record.record} onClick={() => setModalOpen(index)} >
          <h2>{e.language} - {e.time}h</h2>
					<h3>{e.progress}/10</h3>
					<div>{e.author.logo}</div>
        </button>
      ))}

			<ReactModal isOpen={modalOpen >= 0} className={Modals.recordModal} >

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

				<div className={Modals.buttons} >
					<button onClick={() => pressed = modalOpen} >
						<FontAwesomeIcon icon={faEllipsis} height={"2rem"} />
						{(pressed == modalOpen) &&
							<div id={modalOpen.toString()} className={Modals.menu} style={{"display": "initial"}} >
								<span>Edit</span>
								<br/>
								<span>Delete</span>
							</div>
						}
					</button>

					<button onClick={() => setModalOpen(-1)} >
						<FontAwesomeIcon icon={faX} height={"1.8rem"} />
					</button>
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
						<button>
							<FontAwesomeIcon icon={faPlus} height={"2rem"} />
						</button>
					</div>

					<ul>
						<Tags/>
					</ul>

					<button className={LeftBar.Items} onClick={() => setLoginOpen(true)} >
						<FontAwesomeIcon icon={faUser} height={"2rem"} />
						<h2>Sign in</h2>
					</button>

				</div>

				<main id={styles.main} >

					<RecordDivs/>

				</main>

				<button id={styles.addButton} onClick={() => setAddOpen(true)} ><FontAwesomeIcon icon={faPlus} height={"4rem"} /></button>

			</div>

			<ReactModal isOpen={addOpen} className={Modals.addRecordModal} >
				<form action='/api/form' method="post" className={Modals.addForm} >
					<h2>Add new record</h2>

					<div>
						<input placeholder="Header" id="header" name="header" required />

						<input placeholder="Language" id="language" name="language" required />
					</div>

					<div>
						<input placeholder="Time" type="number" min="0" max="59" id="time" name="time" required />
						
						<input type="date" id="date" name="date" required />
					</div>

					<textarea placeholder="Description" id="description" name="description" required />

					<div>
						<label htmlFor='Rating' >Rate yourself:</label>
						<input type="range" min="0" max="10" id="rating" name="rating" required />
					</div>

					<button type="submit">Submit</button>

					<button onClick={() => setAddOpen(false)} className={Modals.closeButton} >
						<FontAwesomeIcon icon={faClose} />
					</button>

				</form>
			</ReactModal>

			<ReactModal isOpen={loginOpen} className={Modals.loginModal} >
				<form action='.......' className={Modals.loginForm} >
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
						<p>Don't have an account yet? <button className={Modals.link} onClick={() => {setRegisterOpen(true); setLoginOpen(false)}}>Register now!</button></p>
					</div>

					<button onClick={() => setLoginOpen(false)} className={Modals.closeButton} >
						<FontAwesomeIcon icon={faClose} />
					</button>

				</form>
			</ReactModal>

			<ReactModal isOpen={registerOpen} className={Modals.loginModal} >
				<form action='.......' className={Modals.loginForm} >
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
						<p>Already have an account? <button className={Modals.link} onClick={() => {setRegisterOpen(false); setLoginOpen(true)}}>Log in!</button></p>
					</div>


					<button onClick={() => setRegisterOpen(false)} className={Modals.closeButton} >
						<FontAwesomeIcon icon={faClose} />
					</button>

				</form>
			</ReactModal>

		</>
  );
}
