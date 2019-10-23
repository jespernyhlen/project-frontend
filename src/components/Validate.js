const hasNumber = myString => {
    return /\d/.test(myString);
};

const ValidateForm = (firstname, lastname, email, year, password) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    let firstnameError = '';
    let lastnameError = '';
    let yearError = '';
    let emailError = '';
    let passwordError = '';

    if (firstname.length < 2 || hasNumber(firstname)) {
        firstnameError = 'Firstname not valid';
    }

    if (lastname.length < 2 || hasNumber(lastname)) {
        lastnameError = 'Lastname not valid';
    }

    if (!expression.test(String(email).toLowerCase())) {
        emailError = 'Email not valid';
    }
    let date = new Date(year);
    let date2 = date.setFullYear(date.getFullYear() + 18);

    if (!year || date2 >= new Date()) {
        yearError = 'You have to be atleast 18 years old to register';
    }

    if (password.length < 6) {
        passwordError = 'Password needs a minimum of 6 characters';
    }

    if (
        firstnameError ||
        lastnameError ||
        emailError ||
        passwordError ||
        yearError
    ) {
        return {
            nameError: firstnameError,
            lastnameError: lastnameError,
            emailError: emailError,
            passwordError: passwordError,
            yearError: yearError
        };
    }
    return true;
};

export default ValidateForm;
