const Film = document.getElementById("Film");
const Antall = document.getElementById("Antall");
const Fornavn = document.getElementById("Fornavn");
const Etternavn = document.getElementById("Etternavn");
const Telefonnr = document.getElementById("Telefonnr");
const Epost = document.getElementById("Epost");
const table = document.getElementById("billett-table-body")
Form.addEventListener("submit", async (e) => {
    e.preventDefault();
    o = 0;
    validateInputs();
    table.innerHTML = "";
    if (o === 1) {
    console.log("Vi hadde en error");
    } else{
       const Listen = {
            film : Film.value ,
            antall : Antall.value ,
            fornavn : Fornavn.value ,
            etternavn : Etternavn.value,
            telefonnr : Telefonnr.value ,
            epost : Epost.value
        }
        try {
            await postrequest(Listen);
        }catch (error){
        console.log("Try post request ", error);
        }


    }
    try {
        await getrequest();
    }catch (error){
        console.log("Try get request ", error);
    }

});

document.getElementById("button").onclick = async function() {
    try {
        await getclear();
    }catch (error){
        console.log("Try clear request ", error);
    }
    console.log("Knapp klikket for slettbutton");

}


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};


const isValidEmail = (Epost) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Epost).toLowerCase());
};

const isValidTelefonnr = (Telefonnr) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(Telefonnr).toLowerCase());
};

const isValidFornavn = (Fornavn) => {
    const re = /^[a-zA-Z ]+$/;
    return re.test(String(Fornavn).toLowerCase());
};
const isValidEtternavn = (Etternavn) => {
    const re = /^[a-zA-Z ]+$/;
    return re.test(String(Etternavn).toLowerCase());
};
let o = 0;

const validateInputs = async () => {

    const AntallValue = Antall.value.trim();
    const FornavnValue = Fornavn.value.trim();
    const EtternavnValue = Etternavn.value.trim();
    const TelefonnrValue = Telefonnr.value.trim();
    const EpostValue = Epost.value.trim();


    if (Film.value === "Velg film") {
        setError(Film, "Du må velge film");
        o = 1;
    } else {
        setSuccess(Film);
    }


    if (AntallValue === "") {
        setError(Antall, "Du må velge antall");
        o = 1;
    } else {
        setSuccess(Antall);
    }

    if (FornavnValue === "") {
        setError(Fornavn, "Du må skrive inn et fornavn");
        o = 1;
    } else if (!isValidFornavn(FornavnValue)) {
        o = 1
        setError(Fornavn, "Skriv inn et gyldig fornavn")
    } else {
        setSuccess(Fornavn);
    }

    if (EtternavnValue === "") {
        setError(Etternavn, "Du må skrive inn et etternavn");
        o = 1;
    } else if (!isValidEtternavn(EtternavnValue)) {
        setError(Etternavn, "Skriv inn et gyldig Etternavn")
        o = 1;
    } else {
        setSuccess(Etternavn);
    }

    if (TelefonnrValue === "") {
        setError(Telefonnr, "Skriv inn et telefonnr");
        o = 1;
    } else if (!isValidTelefonnr(TelefonnrValue)) {
        setError(Telefonnr, "Skriv inn et gyldig telefonnr +4790235323")
        o = 1;
    } else {
        setSuccess(Telefonnr);
    }

    if (EpostValue === "") {
        setError(Epost, "Epost er nødvendig");
        o = 1;
    } else if (!isValidEmail(EpostValue)) {
        setError(Epost, "Skriv inn en gyldig Epost adresse");
        o = 1;
    } else {
        setSuccess(Epost);
    }


}
function postrequest(post) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/lagreData", true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.onreadystatechange = function() {
        if( xhttp.readyState===4 ){
            if (xhttp.status===200){
                console.log("Lagret data, ", xhttp.responseText)
            } else{
                console.error("Data ikke lagret ", xhttp.status)
            }
        }


    }
    xhttp.send(JSON.stringify(post));
}
function getrequest() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getData", true);
    xhttp.onreadystatechange = function() {
        if( xhttp.readyState===4 ){
            if (xhttp.status===200){
                const data = JSON.parse(xhttp.responseText)
                let billett = "";
                for (let i = 0; i < data.length ; i++) {
                    billett += `
                    <tr>
                        <td>${data[i].film}</td>
                        <td>${data[i].antall}</td>
                        <td>${data[i].fornavn}</td>
                        <td>${data[i].etternavn}</td>
                        <td>${data[i].telefonnr}</td>
                        <td>${data[i].epost}</td>
                    </tr>
                    `
                }
                if(data && data.length > 0){
                    console.log("Data returned data", data)
                    table.innerHTML = billett;
                } else{
                    console.log("Data returned null", data);
                }


            } else{
                console.error("Data ikke lagret ", xhttp.status)
            }
        }

    }
    xhttp.send();
}
function getclear() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/clearData", true);
    xhttp.onreadystatechange = function() {
        if( xhttp.readyState===4 ){
            if (xhttp.status===200){
                table.innerHTML = "";
            } else{
                console.error("Data ikke slettet ", xhttp.status)
            }
        }

    }
    xhttp.send();
}