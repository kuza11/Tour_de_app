import Head from "next/head";
import styles from '../styles/Home.module.css';


export default function Calendar() {
	return (
		<>
			<Head>
				<title>Tréninkový deník pro programátory | Kalendář</title>
			</Head>

			<main className={styles.main}>

				<button onClick={createCalendar}>aaaaa</button>

				<ul id={"calendar"}>
					<li>hellooooooo</li>
				</ul>

			</main>
		</>
	);
}

function createCalendar() {
	for (let i = 0; i < 365; i++) {
		const node = document.createElement("li");
		const textnode = document.createTextNode(i.toString());
		node.appendChild(textnode);
		document.getElementById("calendar")?.appendChild(node);
	}
}
