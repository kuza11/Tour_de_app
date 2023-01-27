import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import Styles from '../styles/Home.module.css';
import Modals from '../styles/Modals.module.css';
import Login from '../styles/Login.module.css';
import LeftBar from '../styles/LeftBar.module.css';

interface TagProps {
	selectedTags: Tag[];
	setSelectedTags: (selectedTags: Tag[]) => void;
}

function Tags({ selectedTags, setSelectedTags }: TagProps) {
	const [tags, setTags] = useState<Tag[]>([]);
	const [editTag, setEditTag] = useState<Tag>({name: '', description: '', color: '', id: 0});
	const [editTagOpen, setEditTagOpen] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3000/api/tags')
			.then((res) => res.json())
			.then((data) => setTags(data))
	}, []);

	function handleSelect(element: Tag) {
		if (!selectedTags.find((e) => e.name === element.name)) {
			setSelectedTags([...selectedTags, element]);
		} else {
			setSelectedTags(selectedTags.filter((e) => e.name != element.name));
		}
	}

	function handleEdit(tag: Tag) {
		setEditTag(tag);
		setEditTagOpen(true);
	}

	async function handleDelete(tag: Tag) {
		let res = await fetch(`http://api/tags/${tag.id}`, {
			method: 'DELETE',
		});
		if (res.status != 200) {
			console.error(res);
		}
	}

	function handleChangeEditTag(event: React.ChangeEvent<HTMLInputElement>) {
		setEditTag({...editTag, [event.target.name]: event.target.value});
	}

	function handleTextAreaChangeEditTag(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setEditTag({...editTag, [event.target.name]: event.target.value});
	}

	async function handleEditTagSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let res = await fetch(`http://api/tags/${editTag.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				name: editTag.name,
				color: editTag.color,
				description: editTag.description,
			}),
			headers: {
				'Content-Type': 'apllication/json',
			},
		});
		if (res.status != 200) {
			console.error(res);
		}
	}

  return (
		<ul className={LeftBar.tagList} >
			{tags.map((tag: Tag, index: number) => (
				<div key={index} className={LeftBar.tag} >
					<button style={{ backgroundColor: selectedTags.includes(tag) ?  'transparent' : tag.color }} onClick={() => handleSelect(tag)} className={LeftBar.tagButton} >
						{tag.name}
					</button>
					<button onClick={() => handleEdit(tag)} ><FontAwesomeIcon icon={faPencil} height={12} /></button>
					<button onClick={() => handleDelete(tag)} ><FontAwesomeIcon icon={faTrash} height={12} /></button>
				</div>
			))}

			<Dialog open={editTagOpen} onClose={() => setEditTagOpen(false)} >
				<Dialog.Panel className={[Modals.tagModal].join(" ")} >
					<form className={Modals.addForm} onSubmit={handleEditTagSubmit} >
						<input placeholder='Name' name='name' value={editTag.name} onChange={handleChangeEditTag} className={Modals.addInput} required />
						<input placeholder='Color' name='color' value={editTag.color} onChange={handleChangeEditTag} className={Modals.addInput} />
						<textarea placeholder='Description' name='description' value={editTag.description} onChange={handleTextAreaChangeEditTag} />
						<button type="submit" onClick={() => setEditTagOpen(false)} className={Login.submit} >Submit</button>
					</form>
				</Dialog.Panel>
			</Dialog>
		</ul>
	);
}

export default Tags;

export interface Tag {
	id: number;
	name: string;
	color: string;
	description: string;
}

export function ChooseTagsPopup ({ onChange }: { onChange: (value: Tag[]) => void }) {
	const [selectedElements, setSelectedElements] = useState<Tag[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [tags, setTags] = useState<Tag[]>([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/tags')
			.then((res) => res.json())
			.then((data) => setTags(data))
		}, []);


	function handleSelect(element: Tag) {
		if (!selectedElements.find((e) => e.name === element.name)) {
			setSelectedElements([...selectedElements, element]);
		} else {
			setSelectedElements(selectedElements.filter((e) => e.name != element.name));
		}
		onChange(selectedElements);
	}

	return (
		<div>
			<button type="button" onClick={() => {setIsVisible(!isVisible)}} >Tags</button>
			{isVisible && (
				<div className={Styles.popup} >
					{
					tags.map((tag) => (
						<button key={tag.id} type="button" onClick={() => handleSelect(tag)}>{tag.name}</button>
					))}
				</div>
			)}
		</div>
	);
}
