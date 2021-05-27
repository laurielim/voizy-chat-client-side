import React, { createContext, useContext, useState } from "react";
import * as Cookies from "js-cookie";
import axios from "axios";

const setUserCookie = (user) => {
	Cookies.remove("user");
	Cookies.set("user", user, { expires: 14 });
};

const getUserCookie = () => {
	const userCookie = Cookies.get("user");

	if (userCookie === undefined) {
		return {};
	} else {
		return JSON.parse(userCookie);
	}
};

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(getUserCookie());

	const signup = (email, password, username) => {
		const data = {
			email: email,
			password: password,
			username: username,
		};
		/** server signup url */
		const url =
			"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/signup";

		return axios
			.post(url, data)
			.then((res) => {
				console.log(res);
				return "";
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response) {
					// client received an error response (5xx, 4xx)
					return err.response.data.message;
				} else if (err.request) {
					// client never received a response, or request never left
					return "An error occured! Server cannot be reached.";
				} else {
					// anything else
					return "An error occured! Please try again.";
				}
			});
	};

	const login = (email, password) => {
		const data = {
			email: email,
			password: password,
		};
		/** server login url */
		const url =
			"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/login";

		return axios
			.post(url, data)
			.then((res) => {
				let user = {
					email: res.data.email,
					password: res.data.password,
				};
				setUserCookie(user);
				setCurrentUser(user);
				return "";
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response) {
					// client received an error response (5xx, 4xx)
					return err.response.data.message;
				} else if (err.request) {
					// client never received a response, or request never left
					return "An error occured! Server cannot be reached.";
				} else {
					// anything else
					return "An error occured! Please try again.";
				}
			});
	};

	const logout = () => {
		Cookies.remove("user");
		console.log("logout");
	};

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
