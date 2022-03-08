
// NO USAR SEEDS, BORRARÍA BBDD DEFINITIVA

/* require('dotenv').config();

const mongoose = require('mongoose')
const Project = require('../models/project.model');
const User = require("../models/user.model")
const faker = require('faker');
const coolImages = require("cool-images")


require('../config/db.config');

const getRandomSkills = () => {
    const skills = ["JavaScript", "Node", "MongoDb", "Express"]
    const randomSkill = () => skills[Math.floor(Math.random() * skills.length)]
    const randomSkills = []
    for (let index = 0; index < 3; index++) {
        randomSkills.push(randomSkill())
    }
    return randomSkills
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
            // Seed Users
            const users = []
            for (let i = 0; i < 125; i++) {
                const user = {
                    name: faker.name.findName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    googleID: faker.internet.password(),
                    biography: faker.lorem.paragraphs(),
                    currentJob: faker.name.jobTitle(),
                    skills: getRandomSkills(),
                    webs: ["-"],
                    avatar: coolImages.one(200, 200),
                    active: true,
                    activationToken: "-"
                }
                users.push(user)
            }
            users.forEach(user => {
                new User(user).save()
                    .then(user => {
                        // Seed Projects
                        for (let i = 0; i < 4; i++) {
                            const project = new Project({
                                title: faker.name.findName(),
                                images: coolImages.one(200, 200),
                                description: faker.lorem.paragraphs(),
                                skills: getRandomSkills(),
                                user: user
                            })
                            project.save()
                        }
                    }

                    )
                    .catch(err => console.error(err))
            })
        })
        .then(() => {
            console.log("Seed finished")
        })
        .catch(err => console.error('mongoose', err))
}) */