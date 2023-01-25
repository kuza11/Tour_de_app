import Record from '../styles/Record.module.css';
import Modals from '../styles/Modals.module.css';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faX, faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { ChooseTagsPopup } from './tags';

interface Record {
	log: {
		id: number;
		name: string;
		description: string;
		time: number;
		date: number;
		language: string;
		rating: number;
		tags: {
			name: string;
			description: string;
			color: string;
		}[];
		tags_id: number[];
	}
}

export default function RecordDivs() {
	const [modalOpen, setModalOpen] = useState(-1);
	const [editOpen, setEditOpen] = useState(-1);

	const [records, setRecords] = useState<Record[]>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://localhost:3000/api/logs')
			.then((res) => res.json())
			.then((data) => {
				setRecords(data);
				setIsLoading(false);
		})
	}, []);

	if (isLoading) return <h3 className={Modals.center} >Loading...</h3>

	return (
		<>
			<div className={Record.spacer}></div>

      {records?.map(record => (
        <div key={record.log.id} className={Record.record} >
          <button onClick={() => setModalOpen(record.log.id)} className={Record.h2} >{record.log.language} - {record.log.time} min</button>
					<button onClick={() => setModalOpen(record.log.id)} className={Record.h3} >{record.log.rating}/10</button>
					<button onClick={() => setEditOpen(record.log.id)} >
						<FontAwesomeIcon icon={faPencil} height={28} />
					</button>
					<button>
						<FontAwesomeIcon icon={faTrash} height={28} />
					</button>
        </div>
      ))}

			{
			//TODO
			//Create a separate component for editing log
			//Send it to db
			}
			<Dialog open={editOpen >= 0} onClose={() => setEditOpen(-1)} >
				<Dialog.Panel className={Modals.modal} >
					<form className={Modals.addForm} >
						<input defaultValue={records?records[editOpen].log.name:''} name="header" className={Modals.addInput} required />

						<div className={Modals.inputFields} >
							<ChooseTagsPopup/>

							<input defaultValue={records?records[editOpen].log.language:''} name="language" className={Modals.addInput} required />
						</div>

						<div className={Modals.inputFields} >
							<input defaultValue={records?records[editOpen].log.time:''} type="number" min="1" name="time" className={Modals.addInput} required />

							<input defaultValue={records?records[editOpen].log.date:''} type="date" name="date" className={Modals.addInput} required />
						</div>

						<textarea defaultValue={records?records[editOpen].log.description:''} name="description" />

						<div>
							<label htmlFor='Rating' >Rate yourself:</label>
							<br/>
							<input defaultValue={records?records[editOpen].log.rating:''} type="range" min="0" max="10" name="rating" required />
						</div>

						<button type="submit" className={Modals.submit} >Save edited</button>

						<button onClick={() => setEditOpen(-1)} className={Modals.closeButton} >
							<FontAwesomeIcon icon={faClose} />
						</button>

					</form>
				</Dialog.Panel>
			</Dialog>

			{
			//TODO
			//Create separate component
			}
			<Dialog open={modalOpen >= 0} onClose={() => setModalOpen(-1)} >
				<Dialog.Panel className={Modals.modal} >

					<div className={Modals.header} >
						<h2>{records?records[modalOpen].log.name:''}</h2>
						<h3>{records?records[modalOpen].log.language:''}</h3>
					</div>

					<div className={Modals.body} >
						<h4>{records?records[modalOpen].log.description:''}</h4>
					</div>

					<p className={Modals.time} >{records?records[modalOpen].log.time:''} min</p>

					<div className={Modals.progressBar} >
						<div className={Modals.progressBarFiller} >{records?records[modalOpen].log.rating:''}</div>
					</div>

					<button className={Modals.closeButton} onClick={() => setModalOpen(-1)} >
						<FontAwesomeIcon icon={faX} height={28} />
					</button>

				</Dialog.Panel>
			</Dialog>
		</>
  );
}
