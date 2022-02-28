const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name required',
    minLength: [3, 'Name needs at least 3 chars']
  },
  email: {
    type: String,
    required: 'Email required',
    match: [EMAIL_PATTERN, 'email is not valid'],
    unique: true
  },
  password: {
    type: String,
    required: 'Password required',
    match: [PASSWORD_PATTERN, 'Password needs at least 8 chars'],
  },
  googleID: {
    type: String
  },
  githubId: {
    type: String
  },
  biography: {
    type: String,
/*     required: true */
  },
  currentJob: {
    type: String,
  },
  skills: {
    type: [String],
/*     required: true */
  },
  webs: {
    type: [String],
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/plasoironhack/image/upload/v1644663323/ironhack/multer-example/icono-de-li%CC%81nea-perfil-usuario-si%CC%81mbolo-empleado-avatar-web-y-disen%CC%83o-ilustracio%CC%81n-signo-aislado-en-fondo-blanco-192379539_jvh06m.jpg"
  },
  active: {
    type: Boolean,
    default: false
  },
  activationToken: {
    type: String,
    default: () => {
      return Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7)
    }
  },
});

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash
        next()
      })
      .catch(next)
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.virtual('projects', {
  ref: "Project",
  localField: "_id",
  foreignField: "user",
  justOne: false
})

const User = mongoose.model('User', userSchema);

module.exports = User;