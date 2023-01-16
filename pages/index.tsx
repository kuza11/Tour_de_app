import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import LeftBar from '../styles/LeftBar.module.css';
import Modals from '../styles/Modals.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faClose, faFilter, faHome, faPlus, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu, Dialog } from '@headlessui/react';
import RecordDivs from '../components/record';
import Tags from '../components/tags';

let tags = [{id: 1, clicked: true, name: "Tag1"}, {id: 2, clicked: false, name: "Tag2"}, {id: 3, clicked: false, name: "Tag3"}];

export default function Home() {
	const [addOpen, setAddOpen] = useState(false);
	const [signedIn, setSignedIn] = useState(false);

	return (
		<>

			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<div id={styles.body}>

					<Menu>
						<Menu.Button className={[styles.filterButt, styles.butt].join(" ")} ><FontAwesomeIcon icon={faFilter} height={"2rem"} />Filter</Menu.Button>

						<Menu.Items>
							<div className={[styles.filter, styles.popup].join(" ")} >
								<Menu.Item>
								{({active}) => (
										<button className={`${active ? 'selected' : ''}`}>
											Filter
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
								{({active}) => (
										<button className={`${active ? 'selected' : ''}`}>
											Filter
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{() => (
										<button>
											Filter
										</button>
									)}
								</Menu.Item>

							</div>
						</Menu.Items>
					</Menu>

				<Menu>
						<Menu.Button className={[styles.sortButt, styles.butt].join(" ")} ><FontAwesomeIcon icon={faArrowDownWideShort} height={"2rem"} />Sort</Menu.Button>

						<Menu.Items>
							<div className={[styles.sort, styles.popup].join(" ")} >
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


				<div id={LeftBar.LeftBar}>
					<div>Logo</div>

					<Link className={[LeftBar.Items, LeftBar.homeGoalLink].join(" ")} href="/" >
						<FontAwesomeIcon icon={faHome} height={"2rem"} />
						<h2>Home</h2>
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
						<Tags numberOfButtons={3} />
					</ul>

					<Link href="/login" className={signedIn?LeftBar.hidden:LeftBar.Items} >
						<FontAwesomeIcon icon={faUser} height={"2rem"} />
						<h2>Sign in</h2>
					</Link>

					<div className={signedIn?LeftBar.Items:LeftBar.hidden} >

					</div>

				</div>

				<main id={styles.main} >

					<RecordDivs/>

				</main>

				<button id={styles.addButton} onClick={() => setAddOpen(true)} ><FontAwesomeIcon icon={faPlus} height={"4rem"} /></button>

			</div>

			<Dialog open={addOpen} onClose={() => setAddOpen(false)} >
				<Dialog.Panel className={[Modals.addRecordModal, Modals.modal].join(" ")} >
					<form method="POST" className={Modals.addForm} >
						<input placeholder='Header' name="header" className={Modals.addInput} required />

						<div className={Modals.inputFields} >
							<Menu>
								<Menu.Button className={Modals.addInputM}>Tags</Menu.Button>
								<Menu.Items className={Modals.tags} >
									{tags.map((e, index) => (
										<Menu.Item key={index}>
											{() => (
											<p>{e.name}</p>
											)}
										</Menu.Item>
									))}
								</Menu.Items>
							</Menu>

							<input placeholder='Language' name="language" className={Modals.addInput} required />
						</div>

						<div className={Modals.inputFields} >
							<input placeholder='Time spent' type="number" min="1" name="time" className={Modals.addInput} required />

							<input placeholder='Date' type="date" name="date" className={Modals.addInput} required />
						</div>

						<textarea placeholder='Description' name="description" />

						<div>
							<label htmlFor='Rating' >Rate yourself:</label>
							<br/>
							<input placeholder='Rating' type="range" min="0" max="10" name="rating" required />
						</div>

						<button type="submit" className={Modals.submit} >Save edited</button>

						<button onClick={() => setAddOpen(false)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

		</>
	);
}
