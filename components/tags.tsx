import React, { useState } from "react";
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

interface Tag {
	id: number;
	name: string;
	color: string;
}

export function ChooseTagsPopup () {
	const [selectedElements, setSelectedElements] = useState([]);
	const [isVisible, setIsVisible] = useState(false);

	function handleSelect(element: Tag) {
		if (!selectedElements.find((e) => e.name === element.name)) {
			setSelectedElements([...selectedElements, element]);
		} else {
			setSelectedElements(selectedElements.filter((e) => e.name != element.name));
		}
	}

	async function getTags() {
		const data = await fetch(`https://localhost:3000/api/tags`);
		const tags = await data.json();

	}

	// TODO
	// Get all the tags and then show them here
	return (
		<div>
			<button onClick={() => {setIsVisible(!isVisible); getTags();}} >Tags</button>
			{isVisible && (
				<div className={Styles.popup} >
					<button type="button" onClick={() => handleSelect({name: 'Tag 1'})}>Tag 1</button>
					<button type="button" onClick={() => handleSelect({name: 'Tag 2'})}>Tag 2</button>
					<button type="button" onClick={() => handleSelect({name: 'Tag 3'})}>Tag 3</button>
				</div>
			)}
		</div>
	);
}
