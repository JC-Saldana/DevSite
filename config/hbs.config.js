const hbs = require('hbs')
hbs.registerPartials('./views/partials')

hbs.registerHelper('isMyProfile', (options) => {
  const { userName, currentUserName } = options.hash;
  return userName === currentUserName
})

hbs.registerHelper('isMyAcount', (arg1, arg2, options) => {
  if(arg1 === arg2){
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper('isFounder', (userName, options) => {
  console.log(userName)
  if(userName === "Pablo Mateos" || userName === "Carlos Saldaña"){
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

/* hbs.registerHelper('userLikedProject', function (options) {
  const { project, likes } = options.hash;
  console.log("---", project, likes)
  if (project && likes && likes.some(like => like.project == project.id)) {
    console.log("---", project, likes)
    return options.fn(this);
  } else {
    console.log("---", project, likes)
    return options.inverse(this);
  }
}) */