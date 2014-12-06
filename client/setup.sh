#!/bin/bash


sudo add-apt-repository --yes ppa:chris-lea/node.js
sudo apt-get --quiet update
sudo apt-get install --yes --quiet nodejs

cd client
sudo npm -g install grunt-cli karma bower
npm install
bower install

