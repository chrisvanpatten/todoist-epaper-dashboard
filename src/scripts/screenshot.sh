#!/bin/bash

source ~/.nvm/nvm.sh

cd ~/code/epaper-dashboard
nvm use

node ~/code/epaper-dashboard/src/scripts/screenshot.js
