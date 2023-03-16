printf "\n\n ---------- MAVEN ---------\n\n"
set -x
mvn $MAVEN_GOAL --settings ci-build/maven-settings.xml $MAVEN_ARGS
set +x
printf "\n\n ---------- /end:MAVEN ---------\n\n"
