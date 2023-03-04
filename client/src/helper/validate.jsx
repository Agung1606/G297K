



/*================ validate ==================*/
export const registerValidation = async (values) => {
    const errors = nameVerify({}, values);
    emailVerify(errors, values);
    passwordVerify(errors, values);

    return errors;
};

export const usernameValidation = async (values) => {
    const errors = usernameVerify({}, values);

    return errors;
};

/*==================================*/
const nameVerify = (error={}, values) => {
    if(!values.firstName) {
        error.firstName = <p className="text-red">Please provide first name</p>
    }

    return error;
};

const emailVerify = (error={}, values) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.email) {
        error.email = <p className="text-red">Email required...</p>
    } else if(values.email.includes(" ")) {
        error.email = <p className="text-red">Wrong email</p>
    } else if(!emailRegex.test(values.email)) {
        error.email = <p className="text-red">Invalid email address...</p>
    }

    return error;
};

const passwordVerify = (error={}, values) => {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\,.<>?~]/;

    if(!values.password) {
        error.password = <p className="text-red">Password required...</p>
    } else if(values.password.includes(" ")) {
        error.password = <p className="text-red">Invalid password</p>
    } else if(values.password.length < 4) {
        error.password = <p className="text-red">Password must be more than 4 characters...!</p>
    } else if(!specialChars.test(values.password)) {
        error.password = <p className="text-red">Password must have special character</p>
    }

    return error;
};

const usernameVerify = (error={}, values) => {
    if(!values.username) {
        error.username = <p className="text-red">Username required...</p>
    } else if(values.username.includes(" ")) {
        error.username = <p className="text-red">Invalid username...!</p>
    }

    return error;
}