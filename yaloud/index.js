// function for signup
function signUp(event) {
    // prevents page reload
    event.preventDefault();

    // get spinner
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // get values from inputs
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;
    const getConfirmPass = document.getElementById("confirmPassword").value;

    if (getName === "" || getEmail === "" || getPass === "" || getConfirmPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    if (getConfirmPass !== getPass) {
        Swal.fire({
            icon: 'info',
            text: 'Password do not match',
            confirmButtonColor: '#2D85DE'
        })
    }

    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPass);
        signData.append("password_confirmation", getConfirmPass);

        const signReq = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    Icon: 'info',
                    text: 'Registration Unsuccessful!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }

}
// function to login
function logIn(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;
    if (getEmail === "" || getPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'password do not match',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else{
        const logForm = new FormData();
        logForm.append("email", getEmail);
        logForm.append("password", getPass);
        const logReg = {
            method: 'POST',
            body: logForm
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";
        fetch(url, logReg)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result));
            const getItem =localStorage.getItem("admin");
            const theItem = JSON.parse(getItem);
            if (theItem.hasOwnProperty("email")){
                location.href = "dashboard.html";
            }else{
                Swal.fire({
                    icon: 'warning',
                    text:'Login unsuccessful',
                    confirmButtonColor:'#2D85DE'
                })
            }

        })
        .catch(error => console.log('error', error));
    }
}
//function for dashboard
function dashboard(){
    const myPageModal = document.querySelector(".pagemodal");
    myPageModal.style.display = "block";
    const myToken = localStorage.getItem("admin");
    const theToken =JSON.parse(myToken);
    const token = theToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: "GET",
        headers: dashHeader
    }
    const url ="https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getCat = document.getElementById("category");
        const getlearn = document.getElementById("learnmat");
        const getSubCat = document.getElementById("subCat");
        const getQuiz = document.getElementById("quiz");
        const getStudent = document.getElementById("student");
        const getName = document.getElementById("adminId")

        getCat.innerHTML = `${result.total_number_of_categories}`;
        getlearn.innerHTML =`${result.total_number_of_learningmaterial}`;
        getSubCat.innerHTML = `${result.total_number_of_subcategories}`;
        getQuiz.innerHTML = `${result.total_number_of_quize}`;
        getStudent.innerHTML=`${result.total_number_of_students}`;
        getName.innerHTML = `${result.admin_name}`;

        myPageModal.style.display = "none";
    })
    .catch(error => console.log('error', error));
}
dashboard();


function studentModal(event){
    event.preventDefault();
    const myModal = document.querySelector(".mymodal");
    myModal.style.display = "block";
    const myToken = localStorage.getItem("admin");
    const theToken =JSON.parse(myToken);
    const token = theToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: "GET",
        headers: dashHeader
    }

   

dataItem =[];
const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students"
fetch(url, dashReq)
.then(response => response.json()
.then(result =>{
    console.log(result)
    result.map((item) => {
        dataItem +=
        `<div class="student-card">
        <p><span class="clent"> Name</span>: <span class="swichItem">${item.name}</p>
        <p><span class="clent"> Email</span>: <span class="swichItem">${item.email}</p>
        <p><span class="clent"> Phone</span>: <span class="swichItem">${item.phone}</p>
        <p><span class="clent"> Position</span>: <span class="swichItem">${item.position}</p>
        <p><span class="clent"> Score</span>: <span class="swichItem">${item.total}</p>
        </div>
        `
        const allStud = document.querySelector(".allstudent");
        allStud.innerHTML = dataItem;
    })
    .catch(error => console.log(`error,error`))
}
    )
)
}


function closeDashModal(){
    const closeStudent= document.getElementById("dash-modal")
    closeStudent.style.display="none"
}


function tableupload(){
    const  myToken = localStorage.getItem("admin");
    const theToken =JSON.parse(myToken);
    const token = theToken.token;


    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: "GET",
        headers: dashHeader
    }

    let table=[];
    const url= "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students"
    fetch (url, dashReq)
    .then(response => response.json())
    .then (result => {
        console.log(result)
        result.map((cyprian) =>{
            table+= `
            <tr>
                    <td>${cyprian.name}</td>
                    <td>${cyprian.email}</td>
                    <td>${cyprian.phone_number}</td>
                    <td>${cyprian.position}</td>
                    <td>${cyprian.total_score}</td>
                </tr>
            `
            const tabledata = document.getElementById("table-id")
            tabledata.innerHTML = table;
        }
        )
    })
    
}

tableupload();


function category( data){
    data.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";
    const getname = document.getElementById("name").value;
    const getimage = document.getElementById("udhs").flies[0];
    if (getName === "" || getimage === "" ) {
        Swal.fire({
            icon: 'sucess',
            text: 'all feild are required',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else{
        const logForm = new FormData();
        cat.append("name", getname);
        cat.append("img", getimage);
        const logReg = {
            method: 'POST',
            headers: getcat,
            body: Formdata
        }
        const url ="https://pluralcodesandbox.com/yorubalearning/api/admin/create_category"
        fetch(url, logReg)
        .then(response => response.json())
        .then(result => 
            console.log(result)
        )
            
}
}



function logout() {
    swal.fire({
        icon:"sucess",
        text:"logout sucessfull",
        confirmButtonColor: "2D85DE"
    })
    setTimeout(()=> {
        localStorage.clear();
        location.href ="index.html"
    },3000)

}