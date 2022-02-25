require('dotenv').config();

const mongoose = require('mongoose')
const projects = require('../data/projects.json')
const Project = require('../models/project.model');
const User = require("../models/user.model")

require('../config/db.config');
console.log(projects)

const getBiography = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Sociis natoque penatibus et magnis dis parturient montes nascetur."
    return lorem
}
const getEmail = () => {
    const random = Math.random()
    return `${random}@gmail.com`
}

const getCurrentJob = () => {
    const random = Math.random()
    return `Job: ${random}`
}

const getName = () => {
    const random = Math.random()
    return `${random}`
}

mongoose.connection.once('open', () => {
    console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

    mongoose.connection.db
        .dropDatabase()
        .then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
        /* .then(() => {
            projects.forEach(project => {
                new Project(project).save()
                    .catch(err => console.error(err))
            })
        }) */
        .then(() => {
            const users = []
            for (let i = 0; i < 125; i++) {
                const user = {
                    name: getName(),
                    email: getEmail(),
                    password: "12345678",
                    googleID: "-",
                    biography: getBiography(),
                    currentJob: getCurrentJob(),
                    skills: ["-"],
                    webs: ["-"],
                    avatar: "-",
                    active: true,
                    activationToken: "-"
                }
                users.push(user)
            }
            users.forEach(user => {
                new User(user).save()
                    .catch(err => console.error(err))
            })
        })
        .catch(err => console.error('mongoose', err))
})