import { Row,Col,Card,Button } from "react-bootstrap"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import { useContext, useEffect, useState } from "react"
import BadgerBudItem from "./BadgerBudItem"

export default function BadgerBudsBasket(props) {
    const allCats = useContext(BadgerBudsDataContext);
    const [basketCats,setBasketCats]=useState([]);
    useEffect(()=>{
        onSave();
    },[allCats])

    function onSave(){
        setBasketCats(allCats.filter(cats=>{
            let status = sessionStorage.getItem(cats.id);
            return (status == "saved"&& status !="adopted");
        }))
    }
    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Row>
                {
                    basketCats.length === 0? <p>You have no buds in your basket</p> :
                    basketCats.map(c=>{
                        return <BadgerBudItem key={c.id} onsave={onSave} {...c}/>
                    })
                }
        </Row>
    </div>
}