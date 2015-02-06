#
# Makefile for installing static website and nginx configs for my
# personal websites.
#

NGINX_DIR=/usr/local/nginx
NGINX_CONF_DIR=$(NGINX_DIR)/conf
HTML_DIR=$(NGINX_DIR)/html

all: html nginx

STATIC_HTML_FILES= $(shell find html -type f -print | egrep -v '\.orig|\#|~' | cut -f2- -d/)
INSTALL_STATIC_FILES=$(addprefix $(HTML_DIR)/,$(STATIC_HTML_FILES))

$(HTML_DIR)/%: html/%
	install -D $< $@
	scripts/install_gzip.pl $< $@.gz

html: $(INSTALL_STATIC_FILES)

nginx:
