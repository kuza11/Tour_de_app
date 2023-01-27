import Record from '../styles/Record.module.css';
import Modals from '../styles/Modals.module.css';
import Login from '../styles/Login.module.css';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faX, faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { ChooseTagsPopup } from './tags';
import ChooseLangPopup, { Language } from './languages';
import { Log, Sort } from '../pages';
import { Tag } from './tags';

interface Record {
	log: {
		id: number;
		name: string;
		description: string;
		time: number;
		date: number;
		rating: number;
		persons_id: number;
		username: string;
		lang_name: string;
	};
	tags: Tag[];
}

interface EditLog extends Log {
	id: number;
}

interface recordDivsProps {
	personID: number;
	selectedSort: Sort | undefined;
	selectedTags: Tag[];
}

export default function RecordDivs({ personID, selectedSort, selectedTags }: recordDivsProps) {
	const [modalOpen, setModalOpen] = useState(-1);
	const [editOpen, setEditOpen] = useState(-1);

	const [records, setRecords] = useState<Record[]>([]);
	const [editLog, setEditLog] = useState<EditLog>({header: '', language: '', time: 0, date: '', description: '', rating: 0, tags: [], id: 0});
	const [isLoading, setIsLoading] = useState(false);

	//const records: Record[] = [{log: {id: 1, name: "Hello", description: "test", time: 24, date: 1674725162, language: 'Rust', rating: 4, tags: [], tags_id: []}}, {log: {id: 1, name: "Hello", description: "test", time: 24, date: 1674725162, language: 'Rust', rating: 4, tags: [], tags_id: []}}, {log: {id: 1, name: "Hello", description: "test", time: 24, date: 1674725162, language: 'Rust', rating: 4, tags: [], tags_id: []}}];
	
	async function deleteRecord(id: number) {
		let res = await fetch(`http://localhost:3000/api/persons/logs/${personID}/${id}`, {
			method: 'DELETE',
		});
		if (res.status == 200) {
			console.error(res);
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEditLog({...editLog, [event.target.name]: event.target.value});
	}

	function handleTagChange(tags: Tag[]) {
		setEditLog({...editLog, tags: tags});
	}

	function handleLangChange(lang: Language) {
		setEditLog({...editLog, language: lang.name});
	}

	function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setEditLog({...editLog, [event.target.name]: event.target.value});
	}

	function getDate(unixtimestamp: number) {
		const date = new Date(unixtimestamp * 1000);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return year + '-' + month + '-' + day;
	}

	function editModal(record: Record) {
		setEditOpen(record.log.id);
		setEditLog({
			header: record.log.name,
			description: record.log.description,
			language: record.log.lang_name,
			time: record.log.time,
			date: getDate(record.log.date),
			rating: record.log.rating,
			tags: record.tags,
			id: record.log.id,
		});
	}

	useEffect(() => {
		setIsLoading(true);
		let url = `http://localhost:3000/api/persons/logs/${personID}`
		if (selectedSort) {
			url += "?sort=" + selectedSort.url + "&order=" + selectedSort.order;
		}
		if (selectedTags.length > 0) {
			url += "&filter=" + JSON.stringify(selectedTags);
		}

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setRecords(data);
				setIsLoading(false);
		})
	}, [personID, selectedSort, selectedTags]);

	async function sendEdited(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (editLog.id > 0) {
			const res = await fetch(`http://localhost:3000/api/persons/log/${personID}/${editLog.id}`, {
				method: 'PUT',
			});
			if (res.status != 200) {
				console.error(res);
			}
		} else {
			alert("No log opened");
		}
	}

	if (isLoading) return <h3 className={Modals.center} >Loading...</h3>

	return (
		<>
			<div className={Record.spacer}></div>

      {records?.map(record => (
        <div key={record.log.id + 700} className={Record.record} >
          <button onClick={() => setModalOpen(record.log.id)} className={Record.h2} >{record.log.lang_name} - {record.log.time} min</button>
					<button onClick={() => setModalOpen(record.log.id)} className={Record.h3} >{record.log.rating}/10</button>
					<button onClick={() => editModal(record)} >
						<FontAwesomeIcon icon={faPencil} height={28} />
					</button>
					<button onClick={() => deleteRecord(record.log.id)} >
						<FontAwesomeIcon icon={faTrash} height={28} />
					</button>
        </div>
      ))}

			<Dialog open={editOpen >= 0} onClose={() => setEditOpen(-1)} >
				<Dialog.Panel className={Modals.modal} >
					<form className={Modals.addForm} onSubmit={sendEdited} >
						<input value={editLog.header} name="header" className={Modals.addInput} onChange={handleChange} required />

						<div className={Modals.inputFields} >
							<ChooseTagsPopup onChange={handleTagChange} />

							<ChooseLangPopup onChange={handleLangChange} />
						</div>

						<div className={Modals.inputFields} >
							<input value={editLog.time} type="number" min="1" name="time" className={Modals.addInput} onChange={handleChange} required />

							<input value={editLog.date} type="date" name="date" className={Modals.addInput} onChange={handleChange} required />
						</div>

						<textarea value={editLog.description} name="description" onChange={handleTextAreaChange} />

						<div>
							<label htmlFor='Rating' >Rate yourself:</label>
							<br/>
							<input value={editLog.rating} type="range" min="0" max="10" name="rating" onChange={handleChange} required />
						</div>

						<button type="submit" className={Login.submit} >Save edited</button>

						<button onClick={() => setEditOpen(-1)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

			<Dialog open={modalOpen >= 0} onClose={() => setModalOpen(-1)} >
				<Dialog.Panel className={Modals.modal} >

					<div className={Modals.header} >
						<h2>{records?records[modalOpen]?.log.name:''}</h2>
						<h3>{records?records[modalOpen]?.log.lang_name:''}</h3>
					</div>

					<div className={Modals.body} >
						<h4>{records?records[modalOpen]?.log.description:''}</h4>
					</div>

					<p className={Modals.time} >{records?records[modalOpen]?.log.time:''} min</p>

					<div className={Modals.progressBar} >
						<div className={Modals.progressBarFiller} >{records?records[modalOpen]?.log.rating:''}</div>
					</div>

					<button className={Modals.closeButton} onClick={() => setModalOpen(-1)} >
						<FontAwesomeIcon icon={faX} height={28} />
					</button>

				</Dialog.Panel>
			</Dialog>
		</>
  );
}
