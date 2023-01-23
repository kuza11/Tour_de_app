import Layout from '../components/layout'
import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core";
import { AppProps } from 'next/app';
import { useState } from 'react';

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export interface LoginData {
	username: string;
	id: number;
}

interface Props extends AppProps {
	loginData: LoginData;
}

export default function MyApp({ Component, pageProps }: Props) {
	const [loginData, setLoginData] = useState<LoginData>({
		username: '',
		id: 0,
	});

  return (
		<Layout>
			<Component {...pageProps} loginData={loginData} setLoginData={setLoginData} />
		</Layout>
	)
}
