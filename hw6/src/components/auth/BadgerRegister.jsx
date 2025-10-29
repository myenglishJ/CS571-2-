import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from "react";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [repeatpassword,setRepeatPassword] = useState("");
    const regex = /^\d{7}$/;

    function register(e){
        //before API call
        e.preventDefault()
        if (!regex.test(password) || !regex.test(repeatpassword)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }
        if(userName == "" || password == "" || repeatpassword==""){
            alert("You must provide both a username and pin!");
            return;
        }
        if(password !== repeatpassword){
            alert("Your pins do not match!");
            return;
        }

        fetch("https://cs571.org/rest/s25/hw6/register",{
            method : "POST",
            credentials: "include",
            headers : {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body : JSON.stringify({
                "username" :userName,
                "pin" :password
            })
        }).then(res=>{
            if (res.status === 409) {
                alert("That username has already been taken!");
            } else if (res.status === 200) {
                alert("Registration was successful!");
            }
        })
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="userName">Username</Form.Label>
            <Form.Control type="text" id ="userName" value={userName} onChange={e=>setUserName(e.target.value)}/>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id ="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <Form.Label htmlFor="repeatpassword">Repeat Password</Form.Label>
            <Form.Control type="password" id ="repeatpassword" value={repeatpassword} onChange={e=>setRepeatPassword(e.target.value)}/>
            <br/>
        </Form>
        <Button variant="primary" onClick={register}>Register</Button> 
    </>
}
