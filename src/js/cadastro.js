const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senhaconfirma = document.getElementById("senha-confirma");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation()
})

function checkInputUsername(){
    const nomeValue = nome.value

    if(nomeValue === ""){
        errorInput(nome, "Preecha com um nome")
    }else{
        const formItem = nome.parentElement;
        formItem.className = "inputs"
    }
}

function checkInputEmail(){
    const emailValue = email.value

    if(emailValue === ""){
        errorInput(email, "Preecha com um email")
    }else{
        const formItem = email.parentElement;
        formItem.className = "inputs"
    }
}

function checkInputPassword(){
    const senhaValue = senha.value

    if(senhaValue === ""){
        errorInput(senha, "A senha pe obrigatória")
    }else if (senhaValue.length < 8){
        errorInput(senha, "A senha deve ter no mínimo 8 caracteres")
    }else{
        const formItem = senha.parentElement;
        formItem.className = "inputs"
    }
}

function checkInputPasswordConfirmation(){
    const senhaValue = senha.value
    const confirmacaoValue = senhaconfirma.value

    if(confirmacaoValue === ""){
        errorInput(senhaconfirma, "A confirmação de senha é obrigatória")
    }else if (confirmacaoValue.length !== senhaValue){
        errorInput(senhaconfirma, "As senhas não são iguais")
    }else{
        const formItem = senhaconfirma.parentElement;
        formItem.className = "inputs"
    }
}

function checkForm(){
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation()

    const formItem = form.querySelectorAll(".inputs")

    const isValid = [...formItem].every( (item) => {
        return item.className === "inputs"
    })

    console.log(isValid)
}

function errorInput(input, message){

    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "inputs error"
}