import Head from "next/head";
import styles from '../styles/Home.module.css';


export default function Calendar() {
	function createCalendar() {
		for (let i = 0; i < 10; i++) {
			const node = document.createElement("li");
			const textnode = document.createTextNode("Looool it works");
			node.appendChild(textnode);
			document.getElementById("calendar").appendChild(node);
		}
	}

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
