import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import LeftBar from '../styles/LeftBar.module.css';
import Record from '../styles/Record.module.css';
import Modals from '../styles/Modals.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faClose, faFilter, faHome, faPencil, faPlus, faTag, faTrash, faTrophy, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Menu, Dialog } from '@headlessui/react';

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
let records = [{ header: "Header1", language: "Rust", description: "Desc", time: 218, rating: "8", author: author, date: "2017-08-09" }, { header: "Header2", language: "C", description: "Desc", time: 18, rating: "9", author: author, date: "2017-08-09" }, { header: "Header3", language: "C++", description: "Desc", time: 375, rating: "5", author: author, date: "2017-08-09" }];

function RecordDivs() {
	const [modalOpen, setModalOpen] = useState(-1);
	const [editOpen, setEditOpen] = useState(-1);

	return (
		<>
      {records.map((e, index) => (
        <div key={index} className={Record.record} >
          <button onClick={() => setModalOpen(index)} className={Record.h2} >{e.language} - {e.time} min</button>
					<button onClick={() => setModalOpen(index)} >{e.author.logo}</button>
					<button onClick={() => setModalOpen(index)} className={Record.h3} >{e.rating}/10</button>
					<button onClick={() => setEditOpen(index)} >
						<FontAwesomeIcon icon={faPencil} height={"1.8rem"} />
					</button>
					<button        >
						<FontAwesomeIcon icon={faTrash} height={"1.8rem"} />
					</button>
        </div>
      ))}

			<Dialog open={editOpen >= 0} onClose={() => setEditOpen(-1)} >
				<Dialog.Panel className={Modals.addRecordModal} >
					<form action='Send to Jakub' method="post" className={Modals.addForm} >
						<input defaultValue={records[editOpen]?.header} name="header" className={Modals.addInput} required />

						<div className={Modals.inputFields} >
							<Menu>
								<Menu.Button className={Modals.addInputM}>Tags</Menu.Button>
								<Menu.Items className={Modals.tags} >
								{tags.map((e, index) => (
									<Menu.Item key={index}>
										{() => (
											<p>{e}</p>
										)}
									</Menu.Item>
								))}
								</Menu.Items>
							</Menu>

							<input defaultValue={records[editOpen]?.language} name="language" className={Modals.addInput} required />
						</div>

						<div className={Modals.inputFields} >
							<input defaultValue={records[editOpen]?.time} type="number" min="1" name="time" className={Modals.addInput} required />

							<input defaultValue={records[editOpen]?.date} type="date" name="date" className={Modals.addInput} required />
						</div>

						<textarea defaultValue={records[editOpen]?.description} name="description" />

						<div>
							<label htmlFor='Rating' >Rate yourself:</label>
							<br/>
							<input defaultValue={records[editOpen]?.rating} type="range" min="0" max="10" name="rating" required />
						</div>

						<button type="submit" className={Modals.submit} >Save edited</button>

						<button onClick={() => setEditOpen(-1)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

			<Dialog open={modalOpen >= 0} onClose={() => setModalOpen(-1)} >
				<Dialog.Panel className={Modals.recordModal} >

					<div className={Modals.header} >
						<h2>{records[modalOpen]?.header}</h2>
						<h3>{records[modalOpen]?.language}</h3>
					</div>

					<div className={Modals.body} >
						<h4>{records[modalOpen]?.description}</h4>
					</div>

					<p className={Modals.time} >{records[modalOpen]?.time} min</p>

					<div className={Modals.progressBar} >
						<div className={Modals.progressBarFiller} >{records[modalOpen]?.rating}</div>
					</div>

					<button className={Modals.closeButton} onClick={() => setModalOpen(-1)} >
						<FontAwesomeIcon icon={faX} height={"1.8rem"} />
					</button>

				</Dialog.Panel>
			</Dialog>
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
				<div id={styles.topBar}>

				<Menu>
						<Menu.Button><FontAwesomeIcon icon={faFilter} height={"2rem"} />Filter</Menu.Button>

						<Menu.Items>
							<div className={styles.sort} >
								<Menu.Item>
									{({active}) => (
										<button className={`${active ? 'selected' : ''}`}>
											Sort A-Z
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{({active}) => (
										<button className={`${active ? 'selected' : ''}`}>
											Sort Z-A
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{() => (
										<button>
											Sort by date
										</button>
									)}
								</Menu.Item>

							</div>
						</Menu.Items>
					</Menu>

					<Menu>
						<Menu.Button  ><FontAwesomeIcon icon={faArrowDownWideShort} height={"2rem"} />Sort</Menu.Button>

						<Menu.Items>
							<div className={styles.sort} >
								<Menu.Item>
								{({active}) => (
										<button className={`${active ? 'selected' : ''}`}>
											Sort A-Z
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
								{({active}) => (
										<button className={`${active ? 'selected' : ''}`}>
											Sort Z-A
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{() => (
										<button>
											Sort by date
										</button>
									)}
								</Menu.Item>

							</div>
						</Menu.Items>
					</Menu>

				</div>

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

			<Dialog open={addOpen} onClose={() => setAddOpen(false)} >
				<Dialog.Panel className={Modals.addRecordModal} >
					<form action='Send to Jakub' method="post" className={Modals.addForm} >
						<div className={Modals.inputFields} >
							<input placeholder="Header" name="header" className={Modals.addInput} required />

							<input placeholder="Language" name="language" className={Modals.addInput} required />
						</div>

						<div className={Modals.inputFields} >
							<input placeholder="Time (minutes)" type="number" min="1" name="time" className={Modals.addInput} required />

							<input type="date" name="date" className={Modals.addInput} required />
						</div>

						<textarea placeholder="Description" name="description" />

						<div>
							<label htmlFor='Rating' >Rate yourself:</label>
							<br/>
							<input type="range" min="0" max="10" name="rating" required />
						</div>

						<button type="submit" className={Modals.submit} >Add</button>

						<button onClick={() => setAddOpen(false)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

			<Dialog open={loginOpen} onClose={() => setLoginOpen(false)} >
				<Dialog.Panel className={Modals.loginModal} >
					<form action='.......' className={Modals.loginForm} >
						<h2>Online Deník</h2>

						<input placeholder='Username' className={Modals.input} name="username" required />

						<input placeholder='Password' className={Modals.input} name="password" type={'password'} required />

						<div className={Modals.confirmation} >
							<button type="submit" className={Modals.submit} >Create account</button>
							<p>Don&#39;t have an account yet? <button className={Modals.link} onClick={() => {setRegisterOpen(true); setLoginOpen(false)}}>Register now!</button></p>
						</div>

						<button onClick={() => setLoginOpen(false)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

			<Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} >
				<Dialog.Panel className={Modals.loginModal} >
					<form action='.......' className={Modals.loginForm} >
						<h2>Online Deník</h2>

						<input placeholder='Username' className={Modals.input} name="username" required />

						<input placeholder='Password' className={Modals.input} name="password" type={'password'} required />

						<div className={Modals.confirmation} >
							<button type="submit" className={Modals.submit} >Log in</button>
							<p>Already have an account? <button className={Modals.link} onClick={() => {setRegisterOpen(false); setLoginOpen(true)}}>Log in!</button></p>
						</div>

						<button onClick={() => setRegisterOpen(false)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

		</>
  );
}
