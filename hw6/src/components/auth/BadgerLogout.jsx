import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import React, { useEffect,useContext } from 'react';

export default function BadgerLogout() {
    
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            alert("You have been logged out!")
            sessionStorage.setItem("loginStatus", "logged-out");
            sessionStorage.removeItem("username");
            setLoginStatus("logged-out");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
