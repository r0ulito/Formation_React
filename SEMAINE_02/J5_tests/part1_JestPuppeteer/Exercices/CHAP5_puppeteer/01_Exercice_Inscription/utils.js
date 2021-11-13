
const genUser = (name, age) => `${name} age : ${age}`;

const validate = (text, numeric = false) => {

    if (!text) return false;

    if (numeric && text && parseInt(text) === NaN) {

        return false;
    }

    if (text && text.trim().length === 0) return false;

    return true;
}

module.exports = {
    genUser : genUser,
    validate : validate
} ;