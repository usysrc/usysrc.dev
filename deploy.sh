#!/bin/bash
#
# upload via ftp
# ...all inkl only has ftp in the lowest host tier...
#

source .env

ftp ftp://$user:$password@$server <<END_SCRIPT
prompt
lcd ~/dev/html/usysrc.dev/dist/
mput *.html
lcd style
cd style
mput *
lcd ../img
cd ../img
mput *
exit
END_SCRIPT
exit 0