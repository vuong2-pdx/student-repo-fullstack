/** Exercise 03 - Form * */
let form = document.querySelector('form')

const checkMessage = (message) => {
    if (message.length !== 0) {
        return message
    } else {
        return 'No feedback was submitted.'
    }
}

const checkNewsletter = (newsletter) => {
    if (newsletter) {
        return 'Yes, I would like to join the newsletter.'
    } else {
        return 'No, thank you.'
    }
}

form.onsubmit = (event) => {
    // grab elements upon submission
    const inputName = form.elements.fullname.value
    const email = form.elements.email.value
    const message = form.elements.message.value
    const newsletter = form.elements.newsletter.checked

    event.preventDefault()

    console.group('========= Form Submission =========')

    console.log('Name: ', inputName)
    console.log('Email: ', email)
    console.log('Feedback: ', checkMessage(message))
    console.log('Newsletter: ', checkNewsletter(newsletter))

    console.groupEnd()
}
