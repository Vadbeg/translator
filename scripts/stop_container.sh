#!/bin/sh

docker stop $(docker ps -q --filter ancestor=translator:1.0)
