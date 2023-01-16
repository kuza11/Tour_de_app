import { useState } from "react";
import Style from '../styles/Login.module.css';

export default function Login() {
	const [isRegistering, setIsRegistering] = useState(false);

	return (
		<>
			<div className={Style.body} >
				<form action='.......' method="POST" className={Style.loginForm} >
					<h1>Online Deník</h1>

					<input placeholder='Username' className={Style.input} name="username" required />

					<input placeholder='Password' className={Style.input} name="password" type={'password'} required />

					<div className={Style.confirmation} >
						{isRegistering ? (
							<>
								<button type="submit" className={Style.submit} onSubmit={() => setSignedIn(true)} >Create account</button>
								<p>Already have an account? <button type="button" className={Style.link} onClick={() => setIsRegistering(false)}>Log in!</button></p>
							</>
							) : (
								<>
									<button type="submit" className={Style.submit} onSubmit={() => setSignedIn(true)} >Log in</button>
									<p>Don&#39;t have an account yet? <button type="button" className={Style.link} onClick={() => setIsRegistering(true)}>Register now!</button></p>
								</>
						)}
					</div>

				</form>
			</div>
		</>
		);
}
