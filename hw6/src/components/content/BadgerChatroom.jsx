import React, { useEffect, useState,useRef  } from "react"
import  BadgerMessage  from "./BadgerMessage.jsx"
import { Col,Row,Container } from "react-bootstrap";
import { Pagination,Button,Form } from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page,setPage] = useState(1);
    const title = useRef();
    const content = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const pressButton = (e) => {
        e.preventDefault();
        if( title == "" || content == "" ){
            alert("You must provide both a title and content!");
            return;
        }
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`,{
            method:"POST" ,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body: JSON.stringify({
                "title": title.current.value,
                "content": content.current.value
            })
        }).then(res => {
                if( res.status == 200){
                    alert("Successfully posted!");
                    loadMessages();
                }
        })
    }
    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props,page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            <>
                <Form.Label htmlFor="title">Post Title</Form.Label>
                <Form.Control type="text" id="title" ref={title}/>
                <Form.Label htmlFor="content">Post Content</Form.Label>
                <Form.Control type="text" id="content" ref={content}/>
                <br/>
                <Button variant="primary" onClick={pressButton}>Create Post</Button>
            </>
            
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        <Container fluid>
                            <Row>
                                {
                                    messages.map(messages=><Col key={messages.id} xs={12} md={6} lg={4} style={{marginBottom: "1rem"}}>
                                        <BadgerMessage {...messages} loadMessages={loadMessages} ></BadgerMessage>
                                </Col>)
                                }
                            </Row>
                        </Container>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <br/>
        <Pagination>
            <Pagination.Item onClick={() => setPage(1)} active={page === 1}>1</Pagination.Item>
            <Pagination.Item onClick={() => setPage(2)} active={page === 2}>2</Pagination.Item>
            <Pagination.Item onClick={() => setPage(3)} active={page === 3}>3</Pagination.Item>
            <Pagination.Item onClick={() => setPage(4)} active={page === 4}>4</Pagination.Item>
        </Pagination>
    </>
}
