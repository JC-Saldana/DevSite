const hbs = require('hbs')
hbs.registerPartials('./views/partials')

hbs.registerHelper('isMyProfile', (options) => {
    const { userName, currentUserName } = options.hash;
    return userName === currentUserName
})