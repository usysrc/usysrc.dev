#!/bin/bash
#
# upload via ftp
# ...all inkl only has ftp in the lowest host tier...
#

source .env

ftp ftp://$user:$password@$server <<END_SCRIPT
prompt
mput *.html
lcd style
cd style
mput *
lcd ../style
cd ../img
mput *
exit
END_SCRIPT
exit 0