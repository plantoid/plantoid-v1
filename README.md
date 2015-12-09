# Plantoid v1

This is a simple script that enables a user to deploy and manage the Plantoid contract. It has an interactive setup for the contract deployment and for performing executing certain contract function calls (e.g. adding a node or adding a recipient). 

The plant will continuously listen to Blockchain events and we are also running a Bitcoin Block Explorer script every 15 minutes that checks for incoming donations to the plant. If a donation has been received the transaction is stored locally (`alltxs.txt`) and added to the Plantoid contract (`newFunds`).

If the fundraiser threshold has been reached the plant will initiate the submission and voting phase. If this period is over, the plant will count all of the votes, submit the results to the contract and then declare the winner.

## How to run

In order to run the script you need to have a local Ethereum Node with RPC enabled. Additionally you need to have an account unlocked so that the plant can independently execute transactions.

```
$ geth --rpc --unlock 0 console
```

If you want to unlock account 0. After this, in a second terminal (in the folder with the files) you can then simply execute:

```
$ node main.js
```
