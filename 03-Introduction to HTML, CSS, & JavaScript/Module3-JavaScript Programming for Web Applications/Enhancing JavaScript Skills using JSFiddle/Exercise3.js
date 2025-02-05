function validatePasswords(passwords){
    const regex = /^[a-zA-Z0-9]{8,20}$/;
    for(let i = 0; i < passwords.length; i++){
        if(!regex.test(passwords[i])){
            console.log(`Invalid password: ${passwords[i]}`);
        }
        else{
            console.log(`Valid password: ${passwords[i]}`);
        }
    }
}

const passwords = ["Password123", "short", "ValidPass123", "too_long_password_example", "12345"];

validatePasswords(passwords);

