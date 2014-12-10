# Angular-Flask Boilerplate

Both client and server apps are contained in this repository, kept in sync. 
They integrate through a RESTful api. 


# Setup
	#!/bin/bash


	sudo add-apt-repository --yes ppa:chris-lea/node.js
	sudo apt-get --quiet update
	sudo apt-get install --yes --quiet nodejs

	cd client
	sudo npm -g install grunt-cli karma bower
	npm install
	bower install
	grunt compile


# Environment variables
APP_ENV: PRODUCTION, STAGING, DEVELOPMENT, TESTING

# Running a server
./manage.py run