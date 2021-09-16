export MAVEN_ARGS="$MAVEN_ARGS -Pvirtuoso,knetminer-deploy"
[[ "$GIT_BRANCH" == 'knetminer' ]] && MAVEN_GOAL='deploy'
