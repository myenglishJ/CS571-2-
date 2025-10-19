function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	//      creat a div for each student
	let parent = document.getElementById("students");
	let studentDiv = document.createElement('div');
	studentDiv.className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3";
	//add element of name
	let name = document.createElement('h4');
	name.innerText=`${studs.name.first} ${studs.name.last}`;
	studentDiv.appendChild(name);

	//add element of major
	let major = document.createElement('h6');
	const strong = document.createElement("strong");
	strong.innerText=`${studs.major}`;
	major.appendChild(strong);
	studentDiv.appendChild(major);

	//add element of introduction
	let introduction1 = document.createElement('p');
	const istrue = studs.fromWisconsin;
	const judge = istrue? "is" : "isn't" ;
	introduction1.innerText=`${studs.name.first} is taking ${studs.numCredits} credits and ${judge} from Wisconsin.`
	let introduction2 = document.createElement('p');
	const count = studs.interests.length;
	introduction2.innerText=`They have ${count} interests including...`;
	studentDiv.appendChild(introduction1);
	studentDiv.appendChild(introduction2);

	//add element of interest
	let interestElement = document.createElement('ul');
	for(items of studs.interests){
		const liElement = document.createElement('li');
		liElement.innerText=items;
		liElement.addEventListener("click", (e) => {
				const selectedText = e.target.innerText;
				// TODO update the search terms to search just for the
				//      selected interest, and re-run the search!
				document.getElementById("search-interest").value = selectedText;
				handleSearch();
			})
		interestElement.appendChild(liElement);
	}
	studentDiv.appendChild(interestElement);
	
	parent.appendChild(studentDiv);
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

		// TODO Implement the search
	fetch("https://cs571.org/rest/s25/hw2/students", {
				headers: {
				"X-CS571-ID": CS571.getBadgerId()
			}
	})
	.then(res=>{
		if(res.status === 200||res.status===304){
			return res.json()
		}else{
			throw new Error();
		}
	})
	.then(data=>{
		let student = data;

		let nameSearch = document.getElementById("search-name").value.trim().toLowerCase();
		let majorSearch = document.getElementById("search-major").value.trim().toLowerCase();
		let interestSearch = document.getElementById("search-interest").value.trim().toLowerCase();
		
		student = student
			.filter(s=>{
				let fullName = `${s.name.first} ${s.name.last}`;
				return fullName.toLowerCase().includes(nameSearch);
			})
			.filter(s=>{
				return s.major.toLowerCase().includes(majorSearch);
			})
			.filter(s=>{
				for(let interest of s.interests){
					if(interest.toLowerCase().includes(interestSearch)){
						return true;
					}
				}
			})

		//show nums of the students in the bottom line
		document.getElementById("num-results").innerText = `${student.length}`;
		//clear the contrainer
		document.getElementById("students").innerHTML='';
		//insert html element
		for(let students of student){
			buildStudents(students);
		}
	})
	.catch(err => {
		console.error("Could not get the data");
	})


}

document.getElementById("search-btn").addEventListener("click", handleSearch);

