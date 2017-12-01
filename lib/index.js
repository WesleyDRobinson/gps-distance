const fs = require('fs')
const {
    calculateDistance,
    parseTxt
} = require('./helpers')

module.exports = getInvitees

async function getInvitees(filename=process.argv[2], radius = 100) {
    const customers = await parseTxt(filename)

    return customers
        .map(customer => {
            customer.dist = calculateDistance(parseFloat(customer.latitude), parseFloat(customer.longitude))
            return customer
        })
        .filter(customer => {
            return customer.dist <= radius
        })
        .sort((a, b) => a.user_id - b.user_id)
}

getInvitees()
    .then(invitees => {
        const formatted = invitees.map(user => `${user.name}, user_id: ${user.user_id}, distance: ${user.dist} km`).join('\n')
        fs.writeFile('inviteesRaw.txt', JSON.stringify(invitees), 'utf8', ()=>{}) // callback required
        fs.writeFile('inviteesFormatted.txt', formatted, 'utf8', ()=>{}) // callback required
    })
    .catch(e => console.error(e))
