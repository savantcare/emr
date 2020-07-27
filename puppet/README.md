Q) How to run the github workflow locally?
vk-tech@vk-mini-layer2-3 ~/g/s/emr> ./.github/run-github-actions-locally.sh

Q) Where are the steps coming from?
./.github/workflows/build.yml

Q) How to run from insdei docker container?
do vnc into the container. By going to 127.0.0.1:5901 pasword: jai
then:
cd /gt/sc-prog-repos/emr/puppet
npx jest
