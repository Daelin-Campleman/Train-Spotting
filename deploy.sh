sudo docker stop TrainSpotting-Frontend;
sudo docker rm TrainSpotting-Frontend;

cd Train-Spotting;

git pull;

cd frontend;

sudo docker build -t frontend .;
sudo docker run -d -p 80:8080 --name TrainSpotting-Frontend --restart unless-stopped -tld frontend;

cd ../../;