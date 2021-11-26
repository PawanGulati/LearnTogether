export const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
    // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export const validFormCheckInit = (inputs) =>{
    let valid = true
    Object.values(inputs).forEach(
        (val)=>(!val || val.length === 0) && (valid = false)
    )
    return valid
}

export const FormCheckBasicFields = (errors, value, name, inputs) => {
    let inputErrors = {
        ...errors
      }

    switch (name) {
        case 'name': 
        inputErrors.name = 
            value.length >= 5
            ? ''
            : 'Name should have at least 5 characters';
            break;
        case 'email': 
        inputErrors.email = 
            validEmailRegex.test(value)
            ? ''
            : 'Not a valid email';
            break;    
        case 'password': 
        inputErrors.password1 = 
            validPasswordRegex.test(value)
            ? ''
            : 'Password should be combination of one uppercase , one lower case, one special char, one digit !';
        break;
        case 'conform_password': 
            inputErrors.password2 = 
                value === inputs.password
                ? ''
                : 'Password didn\'t match';
        break; 
        default:
        break;
    }
    return inputErrors
}

// US Telephone Reg expression that allows 7, 10 or 11 digits with or without hyphens.
export const validPhoneNumber = RegExp(/^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/)
//Should start with, may or maynot contain any of (https?|ftp|smtp): protocols, may or may not have www.,url and domain and also subdomain if any upto 2 levels, can contain path to files but not necessary. last may contain a /
export const validWebsiteOrURL = RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)

export const validPasswordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/);
export const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i);
