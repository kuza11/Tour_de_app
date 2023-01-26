import { useEffect, useState } from "react";
import Styles from '../styles/Home.module.css';

export interface Language {
	id: number;
	name: string;
	color: string;
}

export default function ChooseLangPopup ({ onChange }: { onChange: (value: Language) => void}) {
	const [isVisible, setIsVisible] = useState(false);
	const [languages, setLanguages] = useState<Language[]>([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/languages')
			.then((res) => res.json())
			.then((data) => setLanguages(data))
		}, []);


	return (
		<div>
			<button type="button" onClick={() => {setIsVisible(!isVisible)}} >Languages</button>
			{isVisible && (
				<div className={Styles.popup} >
					{
					languages.map((lang) => (
						<button key={lang.id} type="button" onClick={() => onChange(lang)}>{lang.name}</button>
					))}
				</div>
			)}
		</div>
	);
}
