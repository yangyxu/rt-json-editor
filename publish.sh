#/bin/bash

find ./ -iname .DS_Store -delete

sudo rm -rf build
sudo rm -rf dist

npm run release
