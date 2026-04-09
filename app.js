var lab1_1 = require("./lab/lab1_1").lab
var example_1 = require("./example_1").lab;
var lab2_1 = require("./lab/lab2_1").lab;
var lab2_2 = require("./lab/lab2_2").lab;

var PORT = 8080;


var urlMap = [
	{path: "/", action:__dirname + "/static/index.html"},	 
	{path: "/digest", action: lab1_1},	
	{path: "/example_1", action: example_1}, 
	{path: "/ec2info", action: lab2_1},
	{path: "/runinstance", action: lab2_2},
	];

var service = require("./lib/service").http(urlMap);

service(PORT);

