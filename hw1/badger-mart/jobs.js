function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!
    
    let jobs = document.getElementsByName("job");
    let selectJob = false;

    for(let job of jobs)
    {
        if(job.checked){
            selectJob = true;
            alert("Thank you for applying to be a "+ job.value);
        }
    }
    if(!selectJob){
        alert("Please select a job!");
    }
        // TODO: Alert the user of the job that they applied for!
}