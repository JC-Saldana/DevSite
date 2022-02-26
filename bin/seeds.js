require('dotenv').config();

const mongoose = require('mongoose')
const projects = require('../data/projects.json')
const Project = require('../models/project.model');
const User = require("../models/user.model")
const faker = require('faker');
const coolImages = require("cool-images")


require('../config/db.config');

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
                    name: faker.name.findName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    googleID: faker.internet.password(),
                    biography: faker.random.words(),
                    currentJob: faker.name.jobTitle(),
                    skills: ["-"],
                    webs: ["-"],
                    avatar: coolImages.one(200, 200),
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