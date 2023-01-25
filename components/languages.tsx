interface Language {
	id: number;
	name: string;
	color: string;
}

export function ChooseTagsPopup () {
	const [selectedElements, setSelectedElements] = useState<Language[]>([]);
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
