import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faClose, faHome, faPencil, faPlus, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@headlessui/react';
import Styles from '../styles/Home.module.css';
import LeftBar from '../styles/LeftBar.module.css';
import Modals from '../styles/Modals.module.css';
import Login from '../styles/Login.module.css';
import RecordDivs from '../components/record';
import Tags, { ChooseTagsPopup, Tag } from '../components/tags';
import { LoginData } from '../pages/_app'
import ChooseLangPopup, { Language } from '../components/languages';
import Image from 'next/image';
import Logo from '../public/Programmers Journal.png';

export interface Sort {
	name: string;
	url: string;
	order: string;
}

export interface sortProps {
	selectedSort: Sort | undefined;
	setSelectedSort: (selectedSort: Sort | undefined) => void;
}

function Sort({ selectedSort, setSelectedSort }: sortProps) {
	const [isVisible, setIsVisible] = useState(false);

	let sorts: Sort[] = [
		{name: "Old-New", url: "date", order: "asc"},
		{name: "New-Old", url: "date", order: "desc"},
		{name: "Long-Short", url: "time", order: "desc"},
		{name: "Short-Long", url: "time", order: "asc"},
		{name: "Worst-Best", url: "rating", order: "asc"},
		{name: "Best-Worst", url: "rating", order: "desc"},
		{name: "A-Z", url: "language", order: "asc"},
		{name: "Z-A", url: "language", order: "desc"},
	];

	function handleSelect(element: Sort) {
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

interface Profile {
	username: string;
	password: string;
	password_check: string;
	id: number;
}

export default function Index({ loginData, setLoginData }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [log, setLog] = useState<Log>({header: '', language: '', time: 0, date: '', description: '', rating: 0, tags: []});
	const [addTagOpen, setAddTagOpen] = useState(false);
	const [tag, setTag] = useState<NewTag>({name: '', description: '', color: ''});
	const [editProfileOpen, setEditProfileOpen] = useState(false);
	const [editProfile, setEditProfile] = useState<Profile>({username: loginData.username, password: '', password_check: '', id: loginData.id});

	const [selectedSort, setSelectedSort] = useState<Sort | undefined>(undefined);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);


	async function handleDeleteProfile() {
		if (confirm("Are you sure you want to delete your account?")) {
			const res = await fetch(`http://localhost:3000/api/persons/${loginData.id}`, {
				method: 'DELETE',
			});
			if (res.status != 200) {
				console.error(res);
				alert("There was an error deleting your account");
			} else {
				setLoginData({id: 0, username: ''});
			}
		}
	}

	function handleChangeProfile(event: React.ChangeEvent<HTMLInputElement>) {
		setEditProfile({...editProfile, [event.target.name]: event.target.value});
	}

	async function handleProfileEditSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (confirm("Are you sure you want to change your accont?")) {
			if (editProfile.password == editProfile.password_check) {
				const res = await fetch(`http://localhost:3000/api/persons/${editProfile.id}`, {
					method: 'PUT',
					body: JSON.stringify({
						username: editProfile.username,
						password: editProfile.password,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (res.status != 200) {
					console.error(res);
				}
				setLoginData({...loginData, username: editProfile.username});
				setEditProfile({...loginData, password: '', password_check: ''});
			} else {
				alert("Password does not match!");
			}
		}
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

	function handleTextAreaChangeTag(event: React.ChangeEvent<HTMLTextAreaElement>) {
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

				<Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />

				<div id={LeftBar.LeftBar}>
					<Image src={Logo} alt="Logo" />

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
						<Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
					</ul>

					{loginData.id <= 0 && (
						<Link href="/login" className={LeftBar.Items} >
							<FontAwesomeIcon icon={faUser} height={32} />
							<h2>Sign in</h2>
						</Link>
					)}

					{
					// TODO
					// Styles
					}
					{loginData.id > 0 && (
						<div className={LeftBar.Items} >
							<button onClick={() => setLoginData({username: '', id: 0})} className={LeftBar.Items} >Sign out</button>
							<button onClick={() => setEditProfileOpen(true)} ><FontAwesomeIcon icon={faPencil} height={18} /></button>
							<button onClick={handleDeleteProfile} ><FontAwesomeIcon icon={faTrash} height={18} /></button>
						</div>
					)}

				</div>

				<main id={Styles.main} >

					<RecordDivs personID={loginData.id} selectedSort={selectedSort} selectedTags={selectedTags} />

				</main>

				<button id={Styles.addButton} onClick={() => setAddOpen(true)} ><FontAwesomeIcon icon={faPlus} height={64} /></button>

			</div>

			{
			// TODO
			// Styles
			}
			<Dialog open={editProfileOpen} onClose={() => setEditProfileOpen(false)} >
				<Dialog.Panel className={[Modals.modal].join(" ")} >
					<form className={Modals.addForm} onSubmit={handleProfileEditSubmit} >
						<input placeholder='Username' name='username' value={editProfile.username} onChange={handleChangeProfile} className={Modals.addInput} required />
						<input placeholder='Password' name='password' value={editProfile.password} onChange={handleChangeProfile} type='password' className={Modals.addInput} required />
						<input placeholder='Password again' name='password_check' value={editProfile.password_check} onChange={handleChangeProfile} type='password' className={Modals.addInput} required />
						<button onClick={() => setEditProfileOpen(false)} type='submit' className={Login.submit} >Submit</button>
					</form>
				</Dialog.Panel>
			</Dialog>

			{
			// TODO
			// add styles
			}
			<Dialog open={addTagOpen} onClose={() => setAddTagOpen(false)} >
				<Dialog.Panel className={[Modals.tagModal].join(" ")} >
					<form className={Modals.addForm} onSubmit={handleTagSubmit} >
						<input placeholder='Name' name='name' value={tag.name} onChange={handleChangeTag} className={Modals.addInput} required />
						<input placeholder='Color' name='color' value={tag.color} onChange={handleChangeTag} className={Modals.addInput} />
						<textarea placeholder='Description' name='description' value={tag.description} onChange={handleTextAreaChangeTag} />
						<button onClick={() => setAddTagOpen(false)} type='submit' className={Login.submit} >Submit</button>
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

						<button type="submit" className={Login.submit} >Save edited</button>

						<button onClick={() => setAddOpen(false)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

		</>
		);
}
