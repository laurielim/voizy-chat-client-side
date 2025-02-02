import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();
	const { signup } = useAuth();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [accountError, setAccountError] = useState("");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (password !== confirmPassword) {
			alert("We need the passwords to match to create your account.");
			setIsLoading(false);
			return;
		}
		let resp = await signup(
			emailRef.current.value,
			passwordRef.current.value,
			usernameRef.current.value
		);
		setIsLoading(false);
		resp
			? setAccountError(resp)
			: history.push("/login", {
					message: "successful signup",
					status: 200,
			  });
	};

	return (
		<div
			className='flow d-flex flex-column mx-auto pt-5'
			style={{ maxWidth: "320px" }}
		>
			<h2 className='text-center'>Create a new account:</h2>
			<Form className='flow form-flow' onSubmit={handleSubmit}>
				<Form.Group id='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' ref={emailRef} required />
				</Form.Group>
				<Form.Group id='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						ref={passwordRef}
						required
						onChange={handlePasswordChange}
					/>
				</Form.Group>
				<Form.Group id='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						required
						onChange={handleConfirmPasswordChange}
					/>
					{password !== confirmPassword && (
						<Form.Text className='text-danger'>
							Passwords need to match
						</Form.Text>
					)}
				</Form.Group>
				<Form.Group id='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control type='username' ref={usernameRef} required />
				</Form.Group>
				<Button
					type='submit'
					disabled={isLoading}
					className='squishy w-100 mt-3'
				>
					{isLoading ? "Loading…" : "Create Account"}
				</Button>
			</Form>
			{accountError && (
				<Alert variant='danger' className='mb-0'>
					Oops! {accountError.charAt(0).toUpperCase() + accountError.slice(1)}
				</Alert>
			)}
			<p className='w-100 text-center'>
				Already have an account?
				<br />
				<Link to='/login'>Log in here</Link>
			</p>
		</div>
	);
};

export default Signup;
