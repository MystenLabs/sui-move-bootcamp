## Sui & Move Bootcamp <> Using Prometheus and Grafana for Monitoring (+ a real-world airdrop scenario as a bonus gift)

For this exercise we will show how we can monitor an NFT-airdrop REST API with Prometheus and Grafana.
The first part is a theoretical introduction in the concepts of Monitoring Logging and Alerting, which can be found here:
https://docs.google.com/presentation/d/11QeTQARcDpqHDq76dH4fRx9j-6j7KbSUq5DDAfxkeX0/edit?usp=sharing

### Project Structure

```bash
J3/
├── move/ # The smart contracts for the Hero NFT
│── api/ # The NodeJS-ExpressJS REST API
│── client.sh # A simple bash script that calls the endpoint in a while loop to see the results
├── README.md # Project documentation
```

## Overview

Let's say that we want to have an airdrop of an NFT Collection of `Hero` NFTs, with the following specs:

- The NFTs should not be pre-minted
- The users do not pay for the gas
- Only an admin address can mint NFTs
- Multiple concurrent requests should be served

And that we want to monitor some simple metrics (total requests, successful request, failed requests) with Prometheus and Grafana.

## Architecture Overview

- UI: Sends a POST request to the /mint endpoint of the REST API, including the recipient's address in the HTTP body of the request
- REST API: Builds, signs, sponsors with Enoki, and executes a PTB for minting the NFT for this recipient
- Prometheus: Reads the metrics exposed by the API in the endpoint http://localhost:8000/metrics
- Grafana: Visualises the Prometheus metrics

### Quickstart

#### 1. Start the API

- Create a `.env` file in the [/api](./api/) directory, following the scaffold of the [.env.example](./api/.env.example)
- The content of the `.env` will be provided by the instructors when solving the exercise
- Run the following commands to get the local API running:

```
cd /api
npm i
npm run dev
```

- After following them, try visiting http://localhost:8000, and you should get a "Hello, world!" response

#### 2. Setup the Prometheus Metrics Server

Now let's start the Prometheus server as well, so that we can start monitoring the API:

- Change your current directory into the root [J3](../J3/) of the current exercise
- Run `docker-compose up`
- If you visit `http://localhost:9090/` in a web browser, you will see a simple dashboard provided by Prometheus
- Please notice that the exposed metrics have been defined in the [metrics.ts](./api/src/metrics.ts) file of the API.

#### 3. Simulate a scenario and observe the metrics

- Run the [mint.sh](./mint.sh) script to simulate 50 almost concurrent users requesting their NFT:

  ```
  cd J3/
  chmod +x ./mint.sh
  ./mint.sh
  ```

#### 4. Create your Grafana Dashboard [you can just watch the instructor here]

- Visit http://localhost:3001, and you should see the Grafana UI there
- Login with username `admin`, and password `admin`
- Add Prometheus as a Data Source:
  - Visit the [Connections -> Data Sources](http://localhost:3001/connections/datasources/) page
  - Choose `Prometheus` and add the `http://prometheus:9090` URL where Prometheus is running
- Import the pre-built dashboard:
  - Visit the [Import Dashboard page](http://localhost:3001/dashboard/import)
  - Import the [Grafana Dashboard json file](./Simple%20Mint%20API%20Monitoring-1748520792884.json) of the [J3](./) directory to use a pre-built dashboard

#### 5. Add Alerts [you can just watch the instructor here]

- Each panel of the Grafana dashboard has an `Add Alert Rule` that allows you to define conditions for receiving alerts
- For example, you can choose to receive an alert whenever the Average Response Duration is more than 5 seconds, or when the error rate is above 10% consistently for more than 1 minute.
