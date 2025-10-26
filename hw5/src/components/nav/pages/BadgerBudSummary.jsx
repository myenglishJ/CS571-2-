import { Button, Card } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { useState } from "react";
import { Carousel } from "react-bootstrap";

export default function BadgerBudSummary(props){
    const [showDetail,setShowDetail] = useState(true);
    const imgUrls = props.imgIds.map(
            id => `https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${id}`
        );

    function show(){
        setShowDetail(s=>!s);
    }
    function save(){
        alert(`${props.name} has been added to your basket!`);
        sessionStorage.setItem(props.id,"saved");
        props.onsave();
    }

    return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={props.id}>
        <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "30rem" }}>
            {
                showDetail ? <> 
                        <img 
                            style={{aspectRatio: "1 / 1"}} 
                            src= {imgUrls[0]} 
                            alt={`a picture of ${props.name}`}
                        />
                        <h3>{props.name}</h3>
                    </>
                    :<>
                        <Carousel>
                            {imgUrls.map(url=>{
                                return (<Carousel.Item key={props.id}>
                                            <img 
                                                style={{aspectRatio: "1 / 1",width:"100%"}} 
                                                src= {url} 
                                                alt={`a picture of ${props.name}`}
                                            />                                       
                                        </Carousel.Item>
                            )})}
                        </Carousel>
                        <h3>{props.name}</h3>
                        <p>{props.gender}</p>
                        <p>{props.breed}</p>
                        <p>{props.age}</p>
                        <p>{props.description?props.description:""}</p>
                    </>
            }
            <Button variant="primary" onClick={show}>{showDetail?"Show More":"Show less"}</Button>
            <Button variant="secondary" onClick={save}>Save</Button>
        </Card>
    </Col>
}