import Layout from '../components/layout.js'
import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
