set -e
cd `dirname "$0"`

cd ../web-ui

mvn -Pvirtuoso org.eclipse.jetty:jetty-maven-plugin:10.0.11:run-war
