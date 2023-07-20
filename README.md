<img src="./frontend/public/TrainSpottingLogo.png" alt="" width="100">

# Train Spotting Game

## Endpoints

| Environment | Server | URL |
|-----|-----|-----|
| Production | Front-End | [https://train-spotting.co.za](https://train-spotting.co.za) (secure) |
|  |  | [http://train-spotting.co.za](http://train-spotting.co.za) (insecure) |
|  | Back-End | [https://train-spotting.co.za:444](https://train-spotting.co.za:444) (secure) |
|  |  | [http://train-spotting.co.za:81](http://train-spotting.co.za:81) (insecure) |
|  |  |  |
| localhost | Front-End | [http://localhost:8080](http://localhost:8080) (insecure) |
|  | Back-End | [http://localhost:8181](http://localhost:8181) (insecure) |

Sample backend end-point
[https://train-spotting.co.za:444/messages](https://train-spotting.co.za:444/messages)

## Running locally

Inside the `frontend` folder, run:

```bash
node index.js
```

Inside the `backend` folder, run:

```bash
mvn clean package
java -jar target/TrainSpotting-0.0.1-SNAPSHOT.jar
```

Open your browser to [http://localhost:8080](http://localhost:8080)
