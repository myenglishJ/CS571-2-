import { useState,useEffect } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    const [iniData,setiniData] = useState([]);
    const [students,setStudents] = useState([]);
    const [major,setMajor] = useState("");
    const [name,setName] = useState("");
    const [interest,setInterest] = useState("");
    // const [isPressed,setIsPressed] = useState([]);

    const [page,setPage]=useState(1);

    useEffect(()=>{
        fetch("https://cs571.org/rest/s25/hw4/students",{
            headers:{
                    "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res =>res.json())
        .then(data =>{
            setiniData(data);
            console.log(data)
        })
    },[])
    
    useEffect(()=>{
        setStudents(
            iniData.filter(s=>{
            const totalName = `${s.name.first} ${s.name.last}`
            return totalName.toLowerCase().includes(name.trim().toLowerCase());
        })
        .filter(s=>{
            return s.major.toLowerCase().includes(major.trim().toLowerCase());
        })
        .filter(s=>{
            for(let i of s.interests){
                if(i.toLowerCase().includes(interest)){
                    return true;
                }
            }
        })
        )
    },[iniData,name,major,interest])

    function pressButton(){
        setName("");
        setMajor("");
        setInterest("");
    }

    function buildPage()
    {
        const i = Math.ceil(students.length / 24);
        const paginationItem = [];
        for(let j=1;j<=i;j++)
        {
            paginationItem.push(<Pagination.Item
                key={j}
                active={page==j}
                onClick={()=>setPage(j)}
            >
            {j}
            </Pagination.Item>
            );
        }
        return paginationItem
    }

    function prePage(){
        return <Pagination.Item
                key={0}
                onClick={() => setPage(n => n>1 ? n-1 : n)}>
                Previous
                </Pagination.Item>
    }

    function nextPage(){
        const numPages = Math.ceil(students.length / 24);
        return <Pagination.Item
                key={numPages}
                onClick={ () => setPage( n => n<numPages ? n+1 : n)}>
                Next
                </Pagination.Item>
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={name} onChange={(e)=>setName(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={major} onChange={(e)=>setMajor(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={interest} onChange={(e)=>setInterest(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={pressButton}>Reset Search</Button>
            <p>There are {students.length} student(s) matching your search.</p>
        </Form>
        
        <Container fluid>
            <Row>
                {
                    students.slice((page-1)*24,page*24).map(s => <Col xs={12} ms={12} md={6} lg={4} xl={3} key={s.id}>
                        <Student {...s}/>
                    </Col>)
                }
            </Row>
        </Container>
        <Pagination>
            {prePage()}
            {buildPage()}
            {nextPage()}
        </Pagination>
    </div>

}

export default Classroom;