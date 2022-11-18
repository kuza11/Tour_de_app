import Layout from '../components/layout'
import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AppProps } from 'next/app';
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
