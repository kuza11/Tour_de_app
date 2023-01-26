import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Styles from '../styles/Home.module.css';

function Tags() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);

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

	// TODO
	// Add styles
  return (
		<div>
			{tags.map((tag: Tag, index: number) => (
				<>
					<button key={index} style={{ backgroundColor: tags.includes(selectedTags[index]) ? tag.color : 'transparent' }} onClick={() => handleSelect(tag)}>
						Click me to change color
					</button>
					<button key={index}><FontAwesomeIcon icon={faPencil} /></button>
					<button key={index}><FontAwesomeIcon icon={faTrash} /></button>
				</>
			))}
		</div>
  );
}

export default Tags;

export interface Tag {
	id: number;
	name: string;
	color: string;
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
