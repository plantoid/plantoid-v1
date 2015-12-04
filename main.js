#!/usr/bin/env node

var fs = require('fs');
var Web3 = require('web3');
var prompt = require('prompt');
var helpers = require('./helpers');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
prompt.start();
var address;

function accountoption(cb, contract) {
  // TODO: Implement account test
  // Tests whether accounts have enough funds and lets user choose and unlock account of choice
  var accounts = web3.eth.accounts;

  if (accounts.length === 1) {
    address = accounts[0];
    cb(initiator, address);
  } else {
    console.log("\nWhich account have you unlocked? (Type in 0 - %d for the index of the account)", accounts.length - 1);
    console.log(accounts);
    prompt.get(['account'], function(err, result) {
      console.log("Using account %s for all operations.\n", accounts[result.account]);
      address = accounts[result.account];
      if (contract) {
        cb(contract, contract.plant()[1]);
      }
      else {
        cb(initiator, address);
      }
    });
  }
}

function initiator(contract, btcaddr) {
  helpers.eventSubmissionStart(contract);
  //setInterval(helpers.addressTx, 1000 * 60 * 15, btcaddr, contract, address, helpers.readlasttx);
  helpers.addFunds(100000005, 1234, contract, address)
  //mainmenu(contract);
}

function mainmenu(contract) {
  console.log("\n#### General Panel ####");
  console.log("What do you want to do next?\n");
  console.log("a) Add a Payout Recipient (Enter 'a' in the prompt below)");
  console.log("b) Add a Child (Enter 'b' in the prompt below)");
  prompt.get(['choice'], function(err, result) {
    if (result.choice === 'a') {
      helpers.addRecipient(contract, address, mainmenu);
    }
    else if (result.choice === 'b') {
      helpers.addNode(contract, address, mainmenu);
    }
  })
}

function preconfig() {
  console.log("########## Plantoid Management Panel ##########");
  // First we check if a contract has been previously deployed
  // If yes, we get its address
  fs.readFile('./contract.txt', 'utf8', function(e,success) {
    if(e) {
      console.log("\nYour plant is not deployed on the Ethereum Network yet. Should I deploy it (Y or N): ");
      prompt.get(['choice'], function(err, result) {
        if(result.choice === 'Y') {
          accountoption(helpers.deployContract, false);
        }
        else {
          console.log("\n########## Exiting Now ##########");
        }
      });
    }
    else {
      var contract_list = success.split('\n');


      var plantoidContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nodes","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_nodeaddress","type":"address"}],"name":"addChild","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"plant","outputs":[{"name":"ethaddress","type":"address"},{"name":"btcaddress","type":"string"},{"name":"artist","type":"address"},{"name":"parent","type":"address"},{"name":"isParent","type":"bool"},{"name":"threshold","type":"uint256"},{"name":"fundsraised","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_btc_address","type":"string"},{"name":"_amount","type":"uint256"}],"name":"addRecipients","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"recipients","outputs":[{"name":"name","type":"bytes32"},{"name":"btcaddress","type":"string"},{"name":"amount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"newFunds","outputs":[],"type":"function"},{"inputs":[{"name":"_btcaddr","type":"string"},{"name":"_artist","type":"address"},{"name":"_parent","type":"address"},{"name":"_threshold","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"},{"indexed":false,"name":"a","type":"address"}],"name":"SubmissionState","type":"event"}]);

      contractaddr = contract_list[0].trim();
      contract = plantoidContract.at(contractaddr);

      if (contract_list[1]) {
        //helpers.eventSubmissionEnd(contract_list[1]);
      }
      //accountoption(initiator, contract);
      helpers.voteCount('3MFrDvkL2HNCztPdBEdHhXcoPTtwNbigJ4 ', contract, web3.eth.accounts[1], helpers.readlasttx);
      //helpers.addressTx('1JT8Lr45cbB6b2fsezfBhxyGdQ2ARuNvKS', contract, web3.eth.accounts[1], helpers.readlasttx);

    }
  });
}

preconfig();
