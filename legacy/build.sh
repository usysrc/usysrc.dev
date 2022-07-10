#!/bin/bash
#
# Assembly the website and its resources.

rm -rf ./dist/*

mkdir dist/img/
cp -r img/*.png ./dist/img/
jpegoptim --size=100k img/*.jpg --dest ./dist/img/
mogrify -strip ./dist/img/*.jpg
cp -r style ./dist/

for filename in ./pages/*.html; do
	cat header.html $filename footer.html > ./dist/$(basename $filename)
done
