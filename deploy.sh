#!/bin/bash

source .env

ftp ftp://$user:$password@$server <<END_SCRIPT
prompt
mput *.html
mput style
mput img
exit
END_SCRIPT
exit 0