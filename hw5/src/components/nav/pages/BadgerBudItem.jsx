import { Button, Card } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { useState } from "react";

export default function BadgerBudItem(props){

    const unSelect = ()=>{
        alert(`${props.name} has been removed from your basket!`);
        sessionStorage.removeItem(props.id);
        props.onsave();
    }
    const adopt = ()=>{
        alert(`${props.name} has been adopted!`);
        sessionStorage.setItem(props.id,"adopted");
        props.onsave();
    }
    return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={props.id}>
        <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "30rem" }}>
            <img style={{aspectRatio: "1 / 1"}} src= {`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${props.imgIds[0]}`} alt={`a picture of ${props.name}`}/>
            <h3>{props.name}</h3>
            <Button variant="primary" onClick={unSelect}>Unselect</Button>
            <Button variant="secondary" onClick={adopt}>Adopt</Button>
        </Card>
    </Col>
}