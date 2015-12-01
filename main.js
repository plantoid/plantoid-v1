#!/usr/bin/env node

var fs = require('fs');
var Web3 = require('web3');
var prompt = require('prompt');
var helpers = require('./helpers');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
prompt.start();
var address;
var contract;

//We declare the ABI globally for easy access

function ethaccounttest(cb, contract) {
  // TODO: Implement account test
  // Tests whether accounts have enough funds and lets user choose and unlock account of choice
  var accounts = web3.eth.accounts;

  if (accounts.length === 1) {
    cb(accounts[0]);
  } else {
    console.log("\nWhich account have you unlocked? (Type in 0 - %d for the index of the account)", accounts.length - 1);
    console.log(accounts);
    prompt.get(['account'], function(err, result) {
      console.log("Using account %s for all operations.\n", accounts[result.account]);
      address = accounts[result.account];
      cb();
    });
  }
}

function initiator() {
  console.log("########## Plantoid Management Panel ##########");
  // First we check if a contract has been previously deployed
  // If yes, we get its address
  fs.readFile('./contract.txt', 'utf8', function(e,success) {
    if(e) {
      console.log("\nYour plant is not deployed on the Ethereum Network yet. Should I deploy it (Y or N): ");
      prompt.get(['choice'], function(err, result) {
        if(result.choice === 'Y') {
          ethaccounttest(deploycontract, false);
          //deploycontract
        } else {
          console.log("\n########## Exiting Now ##########");
        }
      });
    } else {
      //var address = ethaccounttest();

      var plantoidContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_nodeaddress","type":"address"}],"name":"addChild","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"plant","outputs":[{"name":"ethaddress","type":"address"},{"name":"btcaddress","type":"string"},{"name":"artist","type":"address"},{"name":"parent","type":"address"},{"name":"isParent","type":"bool"},{"name":"threshold","type":"uint256"},{"name":"fundsraised","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_btc_address","type":"string"},{"name":"_amount","type":"uint256"}],"name":"addRecipients","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"recipients","outputs":[{"name":"name","type":"bytes32"},{"name":"btcaddress","type":"string"},{"name":"amount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"newFunds","outputs":[],"type":"function"},{"inputs":[{"name":"_btcaddr","type":"string"},{"name":"_artist","type":"address"},{"name":"_parent","type":"address"},{"name":"_threshold","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"},{"indexed":false,"name":"a","type":"address"}],"name":"SubmissionState","type":"event"}]);
      //contractaddr = success.trim();
      contract = plantoidContract.at('0x3a06ff369ce59cf83b68d0c8c0cb32e63dfd17c0');
      //plantoid.deployContract();
      //helpers.listener(contract);
      helpers.addressTx('1LMJ5dtcyuYuUY59pKizggZkKKb89hkDfi');
    }
  });
}

initiator();
