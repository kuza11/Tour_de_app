import Head from "next/head";

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>{ children }</div>
		</>
	);
}

