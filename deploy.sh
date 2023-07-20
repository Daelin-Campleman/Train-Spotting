sudo docker stop TrainSpotting-Frontend;
sudo docker rm TrainSpotting-Frontend;
sudo docker stop TrainSpotting-Backend;
sudo docker rm TrainSpotting-Backend;

sudo git pull;

cd frontend;

sudo docker build -t frontend .;
sudo docker run -d --net host --name TrainSpotting-Frontend --restart unless-stopped -tld frontend;

cd ../backend;

mvn clean package;

sudo docker build -t backend .;
sudo docker run -d --net host --name TrainSpotting-Backend --restart unless-stopped -tld backend;
