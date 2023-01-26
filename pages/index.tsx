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
import ChooseLangPopup, { Language } from '../components/languages';

export interface Filter {
	name: string;
}

export interface filterProps {
	selectedFilters: Filter[];
	setSelectedFilters: (selectedFilters: Filter[]) => void;
}

function Filter({ selectedFilters, setSelectedFilters }: filterProps) {
	const [isVisible, setIsVisible] = useState(false);

	// TODO
	// Create filters
	let filters: Filter[] = [{name: "Filter1"}, {name: "Filter1"}];

	function handleSelect(element: Filter) {
		if (!selectedFilters.find((e) => e.name === element.name)) {
			setSelectedFilters([...selectedFilters, element]);
		} else {
			setSelectedFilters(selectedFilters.filter((e) => e.name != element.name));
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

export interface Sort {
	name: string;
}

export interface sortProps {
	selectedSort: Sort | undefined;
	setSelectedSort: (selectedSort: Sort | undefined) => void;
}

function Sort({ selectedSort, setSelectedSort }: sortProps) {
	const [isVisible, setIsVisible] = useState(false);

	let sorts: Sort[] = [{name: "A-Z"}, {name: "Z-A"}, {name: "Old-New"}, {name: "New-Old"}, {name: "Long-Short"}, {name: "Short-Long"}];

	function handleSelect(element: Filter) {
		if (selectedSort?.name === element.name) {
			setSelectedSort(undefined);
		} else {
			setSelectedSort(element);
		}
	}

	return (
		<div>
			<button onClick={() => setIsVisible(!isVisible)} className={[Styles.sortButt, Styles.butt].join(" ")} ><FontAwesomeIcon icon={faArrowDownWideShort} height={32} />Sort</button>

			{isVisible && (
				<div className={[Styles.sort, Styles.popup].join(" ")} >
					{sorts.map((e, index) => (
						<button key={index} onClick={() => handleSelect(e)}>{e.name}</button>
					))}
				</div>
			)}
		</div>
	);
}

export interface Log {
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

interface NewTag {
	name: string;
	description: string;
	color: string;
}

export default function Index({ loginData, setLoginData }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [addTagOpen, setAddTagOpen] = useState(false);
	const [log, setLog] = useState<Log>({header: '', language: '', time: 0, date: '', description: '', rating: 0, tags: []});
	const [tag, setTag] = useState<NewTag>({name: '', description: '', color: ''});

	const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
	const [selectedSort, setSelectedSort] = useState<Sort | undefined>(undefined);

	let signedIn = false;

	if (loginData.id != 0) {
		signedIn = true;
	}

	function handleTagChange(tags: Tag[]) {
		setLog({...log, tags: tags});
	}

	function handleLangChange(lang: Language) {
		setLog({...log, language: lang.name});
	}

	function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setLog({...log, [event.target.name]: event.target.value});
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setLog({...log, [event.target.name]: event.target.value});
	}

	function handleChangeTag(event: React.ChangeEvent<HTMLInputElement>) {
		setTag({...tag, [event.target.name]: event.target.value});
	}

	async function handleTagSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const res = await fetch('http://localhost:3000/api/tags', {
			method: 'POST',
			body: JSON.stringify({
				name: tag.name,
				description: tag.description,
				color: tag.color,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		if (res.status != 201) {
			console.error(res);
		}
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const res = await fetch(`http://localhost:3000/api/person/logs/${loginData.id}`, {
			method: 'POST',
			body: JSON.stringify({
				name: log.header,
				description: log.description,
				time: log.time,
				date: Date.parse(log.date) / 1000,
				language: log.language,
				tags_id: log.tags.map((tag) => tag.id),
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		if (res.status != 201) {
			console.error(res);
		}
	}

	return (
		<>
			<Head>
				<title>Tréninkový deník pro programátory</title>
			</Head>

			<div id={Styles.body}>

				<Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />

				<Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />

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
						<button onClick={() => setAddTagOpen(true)} >
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

					{
					// TODO
					// Upravit profil
					// Odstranit profil
					}
					{signedIn && (
						<button onClick={() => setLoginData({username: '', id: 0})}>Logged in</button>
					)}

					<div className={signedIn?LeftBar.Items:LeftBar.hidden} >

					</div>

				</div>

				<main id={Styles.main} >

					<RecordDivs personID={loginData.id} selectedFilters={selectedFilters} selectedSort={selectedSort} />

				</main>

				<button id={Styles.addButton} onClick={() => setAddOpen(true)} ><FontAwesomeIcon icon={faPlus} height={64} /></button>

			</div>

			{
			// TODO
			// add styles
			}
			<Dialog open={addTagOpen} onClose={() => setAddTagOpen(false)} >
				<Dialog.Panel className={[Modals.modal].join(" ")} >
					<form className={Modals.addForm} onSubmit={handleTagSubmit} >
						<input placeholder='Name' name='name' value={tag.name} onChange={handleChangeTag} className={Modals.addInput} required />
						<input placeholder='Description' name='description' value={tag.description} onChange={handleChangeTag} className={Modals.addInput} />
						<input placeholder='Color' name='color' value={tag.color} onChange={handleChangeTag} className={Modals.addInput} />
					</form>
				</Dialog.Panel>
			</Dialog>

			<Dialog open={addOpen} onClose={() => setAddOpen(false)} >
				<Dialog.Panel className={[Modals.addRecordModal, Modals.modal].join(" ")} >
					<form className={Modals.addForm} onSubmit={handleSubmit} >
						<input placeholder='Header' name='header' value={log.header} onChange={handleChange} className={Modals.addInput} required />

						<div className={Modals.inputFields} >
							<ChooseTagsPopup onChange={handleTagChange} />

							<ChooseLangPopup onChange={handleLangChange} />
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
