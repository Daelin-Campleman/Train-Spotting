sudo docker stop TrainSpotting-Frontend;
sudo docker rm TrainSpotting-Frontend;

# cd Train-Spotting;

git pull;

cd frontend;

sudo docker build -t frontend .;
sudo docker run -d --net host --name TrainSpotting-Frontend --restart unless-stopped -tld frontend;

# cd ../../;

# cp cert.pem ./Train-Spotting/frontend/cert.pem;
# cp key.pem ./Train-Spotting/frontend/key.pem;
# cp csr.pem ./Train-Spotting/frontend/csr.pem;
