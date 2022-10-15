/** Exercise 03 - Form * */
const inputName = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const newsletter = document.querySelector('#newsletter')
const submit = document.querySelector('#submit');

const checkMessage = (message) => {
    if (message.length !== 0) {
        return message
    } else {
        return 'No feedback was submitted.'
    }
}

const checkNewsletter = (newsletter) => {
    if (newsletter.checked) {
        return 'Yes, I would like to join the newsletter.'
    } else {
        return 'No, thank you.'
    }
}

const handler = () => {
    if (inputName.value.length !== 0 && email.value.length !== 0) {
        let result = '========= Form Submission =========\n'

        result = result.concat('\t', 'Name: ', inputName.value, '\n')
        result = result.concat('\t', 'Email: ', email.value, '\n')
        result = result.concat('\t', 'Feedback: ', checkMessage(message.value), '\n')
        result = result.concat('\t', 'Newsletter: ', checkNewsletter(newsletter), '\n')

        console.log(result)
    }
}

submit.addEventListener('click', handler)