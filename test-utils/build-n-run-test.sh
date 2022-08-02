set -e
cd `dirname "$0"`
mydir=`pwd`
cd ..

mvn -Pvirtuoso clean package

cd "$mydir"
./run-test.sh
