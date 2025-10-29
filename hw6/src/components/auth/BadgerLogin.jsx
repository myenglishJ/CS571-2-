import React, { useRef } from 'react';
import { Form,Button } from 'react-bootstrap';


export default function BadgerLogin() {

    // TODO Create the login component.
    const username = useRef();
    const pin = useRef();
    const regex = /^\d{7}$/;

    function login(e){
        e.preventDefault()
        if (!regex.test(pin.current.value)) {
            alert("Your pin is a 7-digit number!");
            return;
        }
        if(username.current.value==""||pin.current.value==""){
            alert("You must provide both a username and pin!");
            return;
        }
        fetch("https://cs571.org/rest/s25/hw6/login",{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body:JSON.stringify({
                "username":username.current.value,
                "pin":pin.current.value
            })
        }).then(res=>{
            if(res.status==401){
                alert("Incorrect username or pin");
            }
            if(res.status==200){
                alert("The login was successful");
            }
        })
    }
    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control type="text" id = "username" ref={username}/>
            <Form.Label htmlFor="pin">Password</Form.Label>
            <Form.Control  type = "password" id = "pin" ref={pin}/>
            <br/>
            <Button variant="primary" onClick={login}>Login</Button>
        </Form>
    </>
}
