import Head from "next/head";

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon-32x32.png" />
			</Head>
			<div>{ children }</div>
		</>
	);
}

