#!/bin/bash

for i in {1..50}
do
  echo "Minting #$i"
  curl -s -X POST http://localhost:8000/mint \
    -H "Content-Type: application/json" \
    -d '{"address":"0x1f68cf2acac0c2eaee2d87fc3ff9954e1b8a1a5169bdda3c3dd9acc8f3c2cf63"}' &
  sleep 0.5
done

# Wait for all background jobs to finish
wait
