#!/bin/bash

find /webroots -type d -exec chmod 755 {} \;

find /webroots -type f -exec chmod 644 {} \;
