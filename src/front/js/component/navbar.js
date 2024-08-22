import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const user = store.user;
	console.log("user",user);
	const navigate = useNavigate();

	function handleLogout() {
		actions.logout();
		if (user !== null) {
			navigate("/");
		} 
	}


	return (
		<nav className="navbar navbar-light bg-white p-3">
			<div className="container">
				<span className="navbar-brand mb-0 h1">Authentication</span>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-form me-3">Create user</button>
					</Link>
					{ user == null ? 
					<Link to="/login">
						<button className="btn btn-form">Login</button>
					</Link>
					:
					<button type="button" className="btn btn-danger" onClick={handleLogout} >Logout</button>
					}
					
				</div>
			</div>
		</nav>
	);
};