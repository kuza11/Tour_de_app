import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faClose, faFilter, faHome, faPlus, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@headlessui/react';
import Styles from '../styles/Home.module.css';
import LeftBar from '../styles/LeftBar.module.css';
import Modals from '../styles/Modals.module.css';
import RecordDivs from '../components/record';
import Tags, { ChooseTagsPopup, Tag } from '../components/tags';
import { LoginData } from '../pages/_app'

interface Filter {
	name: string;
}

function Filter() {
	const [selectedElements, setSelectedElements] = useState<Filter[]>([]);
	const [isVisible, setIsVisible] = useState(false);

	// TODO
	// Create filters
	let filters: Filter[] = [{name: "Filter"}, {name: "Filter"}];

	function handleSelect(element: Filter) {
		if (!selectedElements.find((e) => e.name === element.name)) {
			setSelectedElements([...selectedElements, element]);
		} else {
			setSelectedElements(selectedElements.filter((e) => e.name != element.name));
		}
	}

	return (
		<div>
			<button onClick={() => setIsVisible(!isVisible)} className={[Styles.filterButt, Styles.butt].join(" ")} ><FontAwesomeIcon icon={faFilter} height={32} />Filter</button>

			{isVisible && (
				<div className={[Styles.filter, Styles.popup].join(" ")} >
					{filters.map((e, index) => (
						<button key={index} onClick={() => handleSelect(e)}>{e.name}</button>
					))}
				</div>
			)}
		</div>
	);
}

interface Sort {
	name: string;
}

function Sort() {
	const [selectedElements, setSelectedElements] = useState<Filter[]>([]);
	const [isVisible, setIsVisible] = useState(false);

	// TODO
	// Create sorts
	let sorts: Sort[] = [{name: "A-Z"}, {name: "Z-A"}];

	function handleSelect(element: Filter) {
		if (!selectedElements.find((e) => e.name === element.name)) {
			setSelectedElements([...selectedElements, element]);
		} else {
			setSelectedElements(selectedElements.filter((e) => e.name != element.name));
		}
	}

	return (
		<div>
			<button onClick={() => setIsVisible(!isVisible)} className={[Styles.sortButt, Styles.butt].join(" ")} ><FontAwesomeIcon icon={faArrowDownWideShort} height={32} />Sort</button>

			{isVisible && (
				<div className={[Styles.sort, Styles.popup].join(" ")} >
					{sorts.map((e, index) => (
						<button key={index} onClick={() => handleSelect(e)}>Sort: {e.name}</button>
					))}
				</div>
			)}
		</div>
	);
}

interface Log {
	header: string;
	language: string;
	time: number;
	date: string;
	description: string;
	rating: number;
	tags: Tag[];
}

export interface Props {
	loginData: LoginData;
	setLoginData: (loginData: LoginData) => void;
}

export default function Index({ loginData, setLoginData }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [log, setLog] = useState<Log>({header: '', language: '', time: 0, date: '', description: '', rating: 0, tags: []});

	let signedIn = false;

	if (loginData.id != 0) {
		signedIn = true;
	}

	function handleTagChange(tags: Tag[]) {
		setLog({...log, tags: tags});
	}

	function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setLog({...log, [event.target.name]: event.target.value});
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setLog({...log, [event.target.name]: event.target.value});
	}

	//TODO
	//odeslat do db
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

	}

	return (
		<>
			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<div id={Styles.body}>

				<Filter/>

				<Sort/>

				<div id={LeftBar.LeftBar}>
					<div>Logo</div>

					<Link className={[LeftBar.Items, LeftBar.homeGoalLink].join(" ")} href="/" >
						<FontAwesomeIcon icon={faHome} height={32} />
						<h2>Home</h2>
					</Link>

					<div id={LeftBar.Spacer} ></div>

					<div className={LeftBar.Items} >
						<FontAwesomeIcon icon={faTag} height={32} />
						<h2>Tags</h2>
						<button>
							<FontAwesomeIcon icon={faPlus} height={32} />
						</button>
					</div>

					<ul>
						<Tags numberOfButtons={3} />
					</ul>

					{!signedIn && (
					<Link href="/login" className={LeftBar.Items} >
						<FontAwesomeIcon icon={faUser} height={32} />
						<h2>Sign in</h2>
					</Link>
						)}

					{signedIn && (
					<button onClick={() => setLoginData({username: '', id: 0})}>Logged in</button>
						)}

					<div className={signedIn?LeftBar.Items:LeftBar.hidden} >

					</div>

				</div>

				<main id={Styles.main} >

					<RecordDivs/>

				</main>

				<button id={Styles.addButton} onClick={() => setAddOpen(true)} ><FontAwesomeIcon icon={faPlus} height={64} /></button>

			</div>

			{
			// TODO
			// add onSubmit to send it to db
			}
			<Dialog open={addOpen} onClose={() => setAddOpen(false)} >
				<Dialog.Panel className={[Modals.addRecordModal, Modals.modal].join(" ")} >
					<form className={Modals.addForm} onSubmit={handleSubmit} >
						<input placeholder='Header' name='header' value={log.header} onChange={handleChange} className={Modals.addInput} required />

						<div className={Modals.inputFields} >
							<ChooseTagsPopup onChange={handleTagChange} />

							{
							//TODO
							//Fill this with langs from db
							}
							<input value={log.language} onChange={e => { setLog({...log, language: e.currentTarget.value}); }} placeholder='Language' name="language" className={Modals.addInput} required />
						</div>

						<div className={Modals.inputFields} >
							<input name='time' placeholder='Time spent' value={log.time} onChange={handleChange} type="number" min="0" className={Modals.addInput} required />

							<input name='date' placeholder='Date' value={log.date} onChange={handleChange} type="date" className={Modals.addInput} required />
						</div>

						<textarea name="description" value={log.description} onChange={handleTextAreaChange} placeholder='Description' />

						<div>
							<label htmlFor='rating' >Rate yourself:</label>
							<br/>
							<input placeholder='Rating' name='rating' value={log.rating} onChange={handleChange} type="range" min="0" max="10" required />
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
