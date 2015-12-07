#!/bin/bash
PID=$( ps -ef | grep selenium | grep java | grep -v grep | awk '{ print $2 }' ) # gets the processID
if [ -z "$PID" ]; then # returns true if length zero
   echo Selenium server was not running.
else
   kill -9 $PID
   echo [$PID] Selenium server stopped.
fi
