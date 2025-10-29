import React, { useEffect, useState  } from "react"
import  BadgerMessage  from "./BadgerMessage.jsx"
import { Col,Row,Container } from "react-bootstrap";
import { Pagination } from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page,setPage] = useState(1);

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props,page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        <Container fluid>
                            <Row>
                                {
                                    messages.map(messages=><Col xs={12} md={6} lg={4} style={{marginBottom: "1rem"}}>
                                        <BadgerMessage {...messages}></BadgerMessage>
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
