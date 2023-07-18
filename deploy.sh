sudo docker stop TrainSpotting-Frontend;
sudo docker rm TrainSpotting-Frontend;

cd Train-Spotting;

git pull;

cd frontend;

sudo docker build -t frontend .;
sudo docker run -d -p 4000:4000 --name TrainSpotting-Frontend --restart unless-stopped -tld frontend;

cd ../../;