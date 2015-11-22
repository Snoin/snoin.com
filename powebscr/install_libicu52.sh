#!/bin/bash -v

# TODO: support more platform

wget https://launchpad.net/ubuntu/+source/icu/52.1-3/+build/5386824/+files/libicu52_52.1-3_amd64.deb
dpkg -i libicu52_52.1-3_amd64.deb

