set -e
if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    ssh -i deploy/ssh $DEPLOY_ADDR "cd /home/snoin/snoin.com && git pull -f origin master"
    ssh -i deploy/ssh $DEPLOY_ADDR "ls /home/snoin/snoin.com/snoin.cfg.py"
    ssh -i deploy/ssh $DEPLOY_ADDR "cd /home/snoin/snoin.com && rm -rf node_modules && npm install && npm run build"
    ssh -i deploy/ssh $DEPLOY_ADDR $DEPLOY_SERVER_RESTART
fi
