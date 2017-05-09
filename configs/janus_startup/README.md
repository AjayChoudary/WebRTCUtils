Startup/Restart Scripts:
========================

## Upstart : (Ubuntu <= 14.04)

	$ cp janus.conf /etc/init/janus.conf

	$ initctl status janus

	$ initctl restart janus


## Systemd : (Ubuntu >= 15.04)

	$ cp janus.service /lib/systemd/system/janus.service
	
	Enable janus service

	$ systemctl enable janus
	$ systemctl daemon-reload
	$ systemctl restart janus
	$ systemctl status janus
