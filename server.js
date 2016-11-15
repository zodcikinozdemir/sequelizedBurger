var express = require('express');
var app = express();

// extract our sequelize connection from the models object, to avoid confusion

var sequelize = require('Sequelize');

var models = require('./models');
//models.sequelize.sync();
var sequelizeConnection = models.sequelize;
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// a) sync the tables
.then(function(){
	return sequelizeConnection.sync({force:true})
})
.then(function() {
	return models.Burger.create( 
		{
			burger_name: "Classic Hamburger",
			devoured: false 
		}
	)
})
.then(function() {
	return models.Burger.create(
		{
			burger_name: "Cheeseburger",
			devoured: false 
		}
	)
})


var routes = require('./controllers/burgers_controller.js');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', routes);

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
    console.log("Listening on port %s...", server.address().port);
});
  