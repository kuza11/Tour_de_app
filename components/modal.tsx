import { AppProps } from 'next/app';
import ReactModal from 'react-modal';

export default function Modal({ pageProps }: AppProps) {
	return (
		<ReactModal {...pageProps} >
			<form action="/api/form" method="post">
				<label htmlFor="first">First Name</label>
				<input type="text" id="first" name="first" required />

				<label htmlFor="last">Last Name</label>
				<input type="text" id="last" name="last" required />

				<button type="submit">Submit</button>
			</form>
		</ReactModal>
	)
}
