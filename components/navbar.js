import Link from 'next/link';
import navStyle from './css/navStyle.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faChartSimple,
	faCalendarDays,
	faList,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
	return (
		<nav className={navStyle.nav}>
			<button>Switch view mode</button>
			<ul>
				<Link href="/graph" className={navStyle.navLink} ><FontAwesomeIcon icon={faChartSimple} /></Link>
				<Link href="/calendar" className={navStyle.navLink} ><FontAwesomeIcon icon={faCalendarDays} /> </Link>
				<Link href="/list" className={navStyle.navLink} ><FontAwesomeIcon icon={faList} /></Link>
			</ul>
		</nav>
	);
}

export default Navbar;
