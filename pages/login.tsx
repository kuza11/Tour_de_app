import Style from '../styles/Login.module.css';
import { useState } from "react";
import Router from "next/router";
import { Props } from '.';
import Link from 'next/link';

interface FormData {
	username: string;
	password: string;
	id: number;
}

function Login({ setLoginData }: Props) {
	const [formData, setFormData] = useState<FormData>({username: '', password: '', id: 0});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData({...formData, [event.target.name]: event.target.value});
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			const res = await fetch(`https://localhost:3000/api/persons/${formData.id}`);
			if (!res.ok) throw res;
			const data = await res.json();
			if (data && data.password == formData.password) {
				setLoginData({username: formData.username, id: formData.id});
				Router.push('/');
			} else {
				alert("Passwords does not match");
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={Style.body} >
			<form className={Style.loginForm} onSubmit={handleSubmit} >
				<h1>Online Deník</h1>

				<input placeholder='Username' className={Style.input} name="username" onChange={handleChange} value={formData.username} required />

				<input placeholder='ID' className={Style.input} name="id" onChange={handleChange} value={formData.id==0?undefined:formData.id} type='number' required />

				<input placeholder='Password' className={Style.input} name="password" onChange={handleChange} value={formData.password} type='password' required />

				<div className={Style.confirmation} >
					<button type="submit" className={Style.submit} >Log in</button>
					<p>Don&#39;t have an account yet? <Link href='/register' className={Style.link} >Register now!</Link></p>
				</div>

			</form>
		</div>
		);
}

export default Login;
