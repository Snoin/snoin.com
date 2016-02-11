set -e
if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    openssl aes-256-cbc -K $encrypted_ff646b1048a4_key -iv $encrypted_ff646b1048a4_iv -in ssh.tar.enc -out ssh.tar -d
    file ssh.tar
    tar -xvf ssh.tar
    ls -l deploy/
    ssh -i deploy/ssh -oStrictHostKeyChecking=no $DEPLOY_ADDR -p $DEPLOY_PORT "cd /home/snoin/snoin.com && git reset --hard && git pull -f origin master"
    ssh -i deploy/ssh -oStrictHostKeyChecking=no $DEPLOY_ADDR -p $DEPLOY_PORT "ls /home/snoin/snoin.com/snoin.cfg.py"
    ssh -i deploy/ssh -oStrictHostKeyChecking=no $DEPLOY_ADDR -p $DEPLOY_PORT "cd /home/snoin/snoin.com && rm -rf node_modules && npm set progress=false && npm install && npm run build"
    ssh -i deploy/ssh -oStrictHostKeyChecking=no $DEPLOY_ADDR -p $DEPLOY_PORT "cd /home/snoin/snoin.com && /home/snoin/virtualenvs/snoin.com/bin/pip install --upgrade -e ."
    ssh -i deploy/ssh -oStrictHostKeyChecking=no $DEPLOY_ADDR -p $DEPLOY_PORT $DEPLOY_SERVER_RESTART
fi
