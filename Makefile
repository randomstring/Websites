#
# Makefile for installing static website and nginx configs for my
# personal websites.
#

NGINX_DIR=/usr/local/nginx
NGINX_CONF_DIR=$(NGINX_DIR)/conf
HTML_DIR=$(NGINX_DIR)/html
NGINX_BIN= /usr/local/nginx/sbin/nginx

all: html 

STATIC_HTML_FILES= $(shell find html -type f -print | egrep -v '\.orig|\#|~' | cut -f2- -d/)
INSTALL_STATIC_FILES=$(addprefix $(HTML_DIR)/,$(STATIC_HTML_FILES))

$(HTML_DIR)/%: html/%
	install -D $< $@
	scripts/install_gzip.pl $< $@.gz

html: $(INSTALL_STATIC_FILES)

NGINX_CONFD_FILES= $(shell find nginx/conf.d -type f -print | egrep -v '\#|~' | cut -f2- -d/)
INSTALL_NGINX_CONFD_FILES=$(addprefix $(NGINX_CONF_DIR)/,$(NGINX_CONFD_FILES))

$(NGINX_CONF_DIR)/nginx.conf: nginx/nginx.conf
	sudo $(NGINX_BIN) -t -p nginx -c nginx.conf
	sudo install -D $< $@

$(NGINX_CONF_DIR)/conf.d/%: nginx/conf.d/%
	sudo $(NGINX_BIN) -t -p nginx -c nginx.conf
	sudo install -D $< $@

nginx: $(NGINX_CONF_DIR)/nginx.conf $(INSTALL_NGINX_CONFD_FILES)
