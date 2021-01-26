#!/bin/bash

cp -r img ./dist/
cp -r style ./dist/style/

for filename in ./pages/*.html; do
echo $filename
    # filename=$(basename $filename)
    cat header.html $filename footer.html > ./dist/$(basename $filename)
done