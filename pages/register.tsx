import Style from '../styles/Login.module.css';
import { useState } from "react";
import Router from "next/router";
import { Props } from '.';
import Link from 'next/link';

interface FormData {
	username: string;
	password: string;
	password_test: string;
}

function Register({ setLoginData }: Props) {
	const [formData, setFormData] = useState<FormData>({username: '', password: '', password_test: ''});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData({...formData, [event.target.name]: event.target.value});
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (formData.password === formData.password_test) {
			const res = await fetch('http://localhost:3000/api/persons', {
				method: 'POST',
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
					title: undefined,
					description: undefined,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			if (res.status != 201) console.error(res);
			const data = await res.json();
			setLoginData({
				username: formData.username,
				id: data.lastID,
			});
			alert("Your ID is " + data.id + ". Remember this number, you will need it to log in");
			Router.push('/');
		} else {
			alert("Passwords doesn't match!");
		};
	}

	// TODO
	// Add labels
	return (
		<div className={Style.body} >
			<form className={Style.loginForm} onSubmit={handleSubmit} >
				<h1>Online Deník</h1>

				<input placeholder='username' className={Style.input} name="username" onChange={handleChange} value={formData.username} required />

				<input placeholder='password' className={Style.input} name="password" onChange={handleChange} value={formData.password} type='password' required />

				<input placeholder='repeat password' className={Style.input} name="password_test" onChange={handleChange} value={formData.password_test} type='password' required />

				<div className={Style.confirmation} >
					<button type="submit" className={Style.submit} >Create account</button>
					<p>Already have an account? <Link href='/login' className={Style.link}>Log in!</Link></p>
				</div>

			</form>
		</div>
		);
}

export default Register;
