import React, { useState, useEffect } from "react";
import Styles from '../styles/Home.module.css';
import { Props } from "../pages";

interface MyButtonProps {
	numberOfButtons: number;
}

function MyButtons({ numberOfButtons }: MyButtonProps) {
  const [tags, setTags] = useState(Array(numberOfButtons).fill(false));

  function handleClick(index: number) {
    const newTags = [...tags];
    newTags[index] = !newTags[index];
    setTags(newTags);
  }

  return (
    <div>
      {tags.map((_, index) => (
        <button key={index} style={{ backgroundColor: tags[index] ? 'red' : 'blue' }} onClick={() => handleClick(index)}>
          Click me to change color
        </button>
      ))}
    </div>
  );
}

export default MyButtons;

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
		fetch('https://localhost:3000/api/tags')
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
