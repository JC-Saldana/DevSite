require('dotenv').config();

const mongoose = require('mongoose')
const projects = require('../data/projects.json')
const Project = require('../models/project.model');

require('../config/db.config');
console.log(projects)
mongoose.connection.once('open', () => {
    console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

    mongoose.connection.db
        .dropDatabase()
        .then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
        .then(() => {
            projects.forEach(project => {
                new Project(project).save()
                    .catch(err => console.error(err))
            })
        })
        .catch(err => console.error('mongoose', err))
})