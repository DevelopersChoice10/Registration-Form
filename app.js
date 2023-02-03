const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');


const checkUsername = () =>{

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if(!isRequired(username)){
        showError(usernameEl,'username should not be empty');
    }else if(!isbetween(username.length,min,max)){
        showError(usernameEl,`username should be with in ${min} and ${max}`);
    }else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if(!isRequired(email)){
        showError(emailEl,'Email should not be empty');
    }else if(!isEmailValid(email)){
        showError(emailEl,'Email is not valid');
    }else{
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if(!isRequired(password)){
        showError(passwordEl,'Password should not be empty');
    }else if(!isPasswordSecure(password)){
        showError(passwordEl,'Password is not valid');
    }else{
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if(!isRequired(confirmPassword)){
        showError(confirmPasswordEl,'Confirm Password should not be empty');
    }else if(password !== confirmPassword ){
        showError(confirmPasswordEl,'Password does not match');
    }else{
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
    return re.test(password);
};

const isRequired = value => value === '' ? false :true;

const isbetween = (length,min,max) => length < min || length > max ? false : true;


const showError = (input, message) =>{
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message; 
};

const showSuccess = (input) =>{
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = ''; 
};
 
form.addEventListener('submit',function (e){
    e.preventDefault();

    let isusernamevalid = checkUsername(),
        isemailValid = checkEmail(),
        ispasswordValid = checkPassword(),
        isconfirmpasswordValid = checkConfirmPassword();

    let isformValid = isusernamevalid && isemailValid && ispasswordValid && isconfirmpasswordValid;

    if(isformValid){
        window.alert('success');
    }
})
const debounce = (fn, delay = 500 ) => {
    let timeOutId;
    return (...args) =>{
        if(timeOutId){
            clearTimeout(timeOutId);
        }

        timeOutId = setTimeout(() =>{
            fn.apply(null,args)
        }, delay );
    };
};

form.addEventListener('input', debounce(function (e) {
    switch(e.target.id)
    {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;

    }
}));