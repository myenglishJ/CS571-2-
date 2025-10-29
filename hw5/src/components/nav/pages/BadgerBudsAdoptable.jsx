import { useContext,useEffect,useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import BadgerBudSummary from "./BadgerBudSummary"
import { Row } from "react-bootstrap";

export default function BadgerBudsAdoptable(props) {
    const allCats = useContext(BadgerBudsDataContext);
    const [adoptableCats, setAdoptableCats]=useState([]);
        useEffect(()=>{
            onSave();
    },[allCats]);

    function onSave(){
        setAdoptableCats(
            allCats.filter(cat=>{
                let status = sessionStorage.getItem(cat.id);
                return status === null ;
            })
        )
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Row>
        {
            adoptableCats.length === 0? <p>No buds are available for adoption!</p> :
            adoptableCats.map(c=>{
                return <BadgerBudSummary key={c.id} onsave={onSave} {...c}/>
            })
        }
        </Row>
    </div>
}