const { genUser, validate } = require('./utils');

const users = [
    { name: 'Alan', age: 48 },
    { name: 'Albert', age: 48 },
    { name: 'Alice', age: 47 }
];

const createElement = (text, element, className) => {
    const newElement = document.createElement(element);
    newElement.classList.add(className);
    newElement.textContent = text;

    return newElement;
};

const init = () => {
    const newUserButton = document.querySelector('#add');
    newUserButton.addEventListener('click', addUser);

    const userList = document.querySelector('.users');

    userList.textContent = '';

    users.map(user => {

        content = genUser(
            user.name,
            user.age
        );

        el = createElement(content, 'li', 'item');
        userList.appendChild(el);
    });
};

const addUser = () => {

    // remove  message 

    let message = document.querySelector('.message');
    message.textContent = "";

    const name = document.querySelector('input#name').value;
    const age = document.querySelector('input#age').value;

    if (validate(name) && validate(age, true)) {

        let validUser = users.filter(user => user.name === name);

        if (validUser.length > 0) {
            const el = createElement(`Attention l'utilisateur ${name} existe déjà`, 'div', 'error');
            message.appendChild(el);

            return;
        }

        users.push({ name: name, age: age });

        const userList = document.querySelector('.users');
        const lastUser = document.querySelector('.last-user');

        lastUser.textContent = '';
        document.querySelector('input#name').value = '';
        document.querySelector('input#age').value = '';

        content = genUser(
            name,
            age
        );
        el = createElement(content, 'li', 'item');
        userList.appendChild(el);

        lastUser.textContent = content;

    } else {
        const el = createElement("La saisie comporte une erreur", 'div', 'error');
        message.appendChild(el);
    }

};


init();