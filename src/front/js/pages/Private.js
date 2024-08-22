import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = props => {
	const { store, actions } = useContext(Context);
	const user = store.user;
	//console.log("user",user);
	const navigate = useNavigate();

	useEffect (()=>{
		if (user == null) {
	 		navigate("/login");
	 	} 
	},[user])

	useEffect (()=>{
		if (user !== null) {
		let url = process.env.BACKEND_URL + "api/private";
        console.log ("token", user.access_token)	
        let options = {
            method: "GET",           
            headers: {
                Authorization: "Bearer " + user.access_token
            }
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => { console.log("data",data)
                if (data.mgs)                    
                return navigate("/login");
                
            }
        ); } 

	},[])
	

	return (
		<div className="text-center my-5">
			<h1>This is a private page</h1>
		</div>
	);
};