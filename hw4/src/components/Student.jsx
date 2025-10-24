

const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <h5>{props.major}</h5>
        <p>{props.name.first} is taking {props.numCredits} credits and is from {props.fromWisconsin?"":"NOT"}Wisconsin</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map((i,index)=>
                <li key={props.id+index}>{i}</li>
            )
            }
        </ul>
    </div>
}

export default Student;