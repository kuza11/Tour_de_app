import Head from "next/head";

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Head>
				<link rel="shortcut icon" type="image/ico" href="../public/favicon.ico" />
			</Head>
			<div>{ children }</div>
		</>
	);
}
