import Record from '../styles/Record.module.css';
import Modals from '../styles/Modals.module.css';
import { Menu, Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faX, faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

let tags = [{id: 1, clicked: true, name: "Tag1"}, {id: 2, clicked: false, name: "Tag2"}, {id: 3, clicked: false, name: "Tag3"}];

let authors = {logo: "Logo"};
let records = [{ header: "Header1", language: "Rust", description: "Desc", time: 218, rating: "8", author: authors, date: "2017-08-09" }, { header: "Header2", language: "C", description: "Desc", time: 18, rating: "9", author: authors, date: "2017-08-09" }, { header: "Header3", language: "C++", description: "Desc", time: 375, rating: "5", author: authors, date: "2017-08-09" }];

export default function RecordDivs() {
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
					<button>
						<FontAwesomeIcon icon={faTrash} height={"1.8rem"} />
					</button>
        </div>
      ))}

			<Dialog open={editOpen >= 0} onClose={() => setEditOpen(-1)} >
				<Dialog.Panel className={Modals.modal} >
					<form action='Send to Jakub' method="POST" className={Modals.addForm} >
						<input defaultValue={records[editOpen]?.header} name="header" className={Modals.addInput} required />

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
				<Dialog.Panel className={Modals.modal} >

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
