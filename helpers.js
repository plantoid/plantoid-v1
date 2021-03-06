var fs = require('fs');
var prompt = require('prompt');
var Web3 = require('web3');
var request = require('request');
var async = require('async');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


/****
  ***
  ***   PLANTOID CONTRACT FUNCTIONS
  ***
  ***/

function deployContract(cb, address) {
  console.log("Preparing to deploy the contract. Please enter the following parameters: ");
  prompt.get({
    properties: {
      btcaddr: {
        description: "The Plants Bitcoin Address".magenta
      },
      artist: {
        description: "The Artists Ethereum Address".magenta
      },
      parent: {
        description: "The Smart Contract Address of the Parent (If none, enter 0x)".magenta
      },
      threshold: {
        description: "What is the Fundraiser Threshold (in Bitcoin)".magenta
      }
    }
  }, function(error,result) {
      console.log('\n### Your Choices ###');
      console.log("Bitcoin Address: ", result.btcaddr.trim());
      console.log("Artists Address: ", result.artist.trim());
      console.log("Parent Plant: ", result.parent.trim());
      console.log("Threshold: ", result.threshold);
      console.log("\nDeploying Contract now, this can take a while .... \n");

      var gasprice = web3.eth.gasPrice.toString(10);
      var threshold = parseInt(result.threshold) /  0.00000001;

      var plantoidContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nodes","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_nodeaddress","type":"address"}],"name":"addChild","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"plant","outputs":[{"name":"ethaddress","type":"address"},{"name":"btcaddress","type":"string"},{"name":"artist","type":"address"},{"name":"parent","type":"address"},{"name":"isParent","type":"bool"},{"name":"threshold","type":"uint256"},{"name":"fundsraised","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_btc_address","type":"string"},{"name":"_amount","type":"uint256"}],"name":"addRecipients","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"recipients","outputs":[{"name":"name","type":"bytes32"},{"name":"btcaddress","type":"string"},{"name":"amount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"newFunds","outputs":[],"type":"function"},{"inputs":[{"name":"_btcaddr","type":"string"},{"name":"_artist","type":"address"},{"name":"_parent","type":"address"},{"name":"_threshold","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"},{"indexed":false,"name":"a","type":"address"}],"name":"SubmissionState","type":"event"}]);

      var plantoid = plantoidContract.new(
        result.btcaddr.trim(),
        result.artist.trim(),
        result.parent.trim(),
        threshold,
         {
           from: address,
           data: '6060604052604051611723380380611723833981016040528080518201919060200180519060200190919080519060200190919080519060200190919050505b8360006000506001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009457805160ff19168380011785556100c5565b828001600101855582156100c5579182015b828111156100c45782518260005055916020019190600101906100a6565b5b5090506100f091906100d2565b808211156100ec57600081815060009055506001016100d2565b5090565b505033600060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555082600060005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600060005060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060005060030160146101000a81548160ff0219169083021790555080600060005060040160005081905550600660005080548060010182818154818355818115116102855760030281600302836000526020600020918201910161028491906101ed565b80821115610280576000600082016000506000905560018201600050805460018160011615610100020316600290046000825580601f1061022e575061026b565b601f01602090049060005260206000209081019061026a919061024c565b80821115610266576000818150600090555060010161024c565b5090565b5b506002820160005060009055506001016101ed565b5090565b5b5050509190906000526020600020906003020160005b6060604051908101604052807f506172656e7420506c616e740000000000000000000000000000000000000000815260200188815260200160018152602001509091909150600082015181600001600050556020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061034257805160ff1916838001178555610373565b82800160010185558215610373579182015b82811115610372578251826000505591602001919060010190610354565b5b50905061039e9190610380565b8082111561039a5760008181506000905550600101610380565b5090565b5050604082015181600201600050555050505b50505050611360806103c36000396000f360606040523615610074576000357c0100000000000000000000000000000000000000000000000000000000900480631c53c280146100765780631eee993a146100b8578063779b3c5c146100d057806386f9b943146101e1578063d1bc76a114610249578063e570c9ed1461030557610074565b005b61008c6004808035906020019091905050610407565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100ce6004808035906020019091905050610837565b005b6100dd600480505061031d565b604051808873ffffffffffffffffffffffffffffffffffffffff168152602001806020018773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018381526020018281038252888181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101cc5780601f106101a1576101008083540402835291602001916101cc565b820191906000526020600020905b8154815290600101906020018083116101af57829003601f168201915b50509850505050505050505060405180910390f35b6102476004808035906020019091908035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190803590602001909190505061059b565b005b61025f60048080359060200190919050506103c5565b60405180848152602001806020018381526020018281038252848181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102f45780601f106102c9576101008083540402835291602001916102f4565b820191906000526020600020905b8154815290600101906020018083116102d757829003601f168201915b505094505050505060405180910390f35b61031b6004808035906020019091905050610449565b005b60006000508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101600050908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160149054906101000a900460ff16908060040160005054908060050160005054905087565b600660005081815481101561000257906000526020600020906003020160005b9150905080600001600050549080600101600050908060020160005054905083565b600760005081815481101561000257906000526020600020900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561059657816000600050600501600082828250540192505081905550600060005060040160005054600060005060050160005054101515610595576000600060005060050160005081905550604051610a1880610948833901809050604051809103906000f090507f712fa0272968e5dadb2461889ccb90ae40002fb90910565d701d0ae2eb17d2888160405180806020018373ffffffffffffffffffffffffffffffffffffffff168152602001828103825260188152602001807f5375626d697373696f6e205068617365207374617274656400000000000000008152602001506020019250505060405180910390a15b5b5b5050565b600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806106505750600060005060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15610831576006600050805480600101828181548183558181151161072657600302816003028360005260206000209182019101610725919061068e565b80821115610721576000600082016000506000905560018201600050805460018160011615610100020316600290046000825580601f106106cf575061070c565b601f01602090049060005260206000209081019061070b91906106ed565b8082111561070757600081815060009055506001016106ed565b5090565b5b5060028201600050600090555060010161068e565b5090565b5b5050509190906000526020600020906003020160005b606060405190810160405280878152602001868152602001858152602001509091909150600082015181600001600050556020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106107c257805160ff19168380011785556107f3565b828001600101855582156107f3579182015b828111156107f25782518260005055916020019190600101906107d4565b5b50905061081e9190610800565b8082111561081a5760008181506000905550600101610800565b5090565b5050604082015181600201600050555050505b5b505050565b600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610944576001600060005060030160146101000a81548160ff02191690830217905550600760005080548060010182818154818355818115116109045781836000526020600020918201910161090391906108e5565b808211156108ff57600081815060009055506001016108e5565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b5b505660606040526000600160146101000a81548160ff021916908302179055505b62278d00420160006000508190555032600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6109b1806100676000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480632fc6e8b714610065578063ad73349e14610074578063b647990a146101b2578063d39fdce7146101c1578063d53b92931461025e57610063565b005b61007260048050506106de565b005b61008a600480803590602001909190505061027f565b60405180806020018060200184815260200183810383528681815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561011d5780601f106100f25761010080835404028352916020019161011d565b820191906000526020600020905b81548152906001019060200180831161010057829003601f168201915b50508381038252858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101a05780601f10610175576101008083540402835291602001916101a0565b820191906000526020600020905b81548152906001019060200180831161018357829003601f168201915b50509550505050505060405180910390f35b6101bf60048050506107b3565b005b61025c6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506102c0565b005b61027d600480803590602001909190803590602001909190505061064e565b005b600260005081815481101561000257906000526020600020906003020160005b91509050806000016000509080600101600050908060020160005054905083565b6000600160149054906101000a900460ff1614156106495760026000508054806001018281815481835581811511610408576003028160030283600052602060002091820191016104079190610311565b8082111561040357600060008201600050805460018160011615610100020316600290046000825580601f106103475750610384565b601f0160209004906000526020600020908101906103839190610365565b8082111561037f5760008181506000905550600101610365565b5090565b5b5060018201600050805460018160011615610100020316600290046000825580601f106103b157506103ee565b601f0160209004906000526020600020908101906103ed91906103cf565b808211156103e957600081815060009055506001016103cf565b5090565b5b50600282016000506000905550600101610311565b5090565b5b5050509190906000526020600020906003020160005b606060405190810160405280868152602001858152602001600081526020015090919091506000820151816000016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061049857805160ff19168380011785556104c9565b828001600101855582156104c9579182015b828111156104c85782518260005055916020019190600101906104aa565b5b5090506104f491906104d6565b808211156104f057600081815060009055506001016104d6565b5090565b50506020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061054b57805160ff191683800117855561057c565b8280016001018555821561057c579182015b8281111561057b57825182600050559160200191906001019061055d565b5b5090506105a79190610589565b808211156105a35760008181506000905550600101610589565b5090565b5050604082015181600201600050555050507f25921b3fdffefc225a7ecb3f54ed8e61e4e740ccddc6394c8d9334de01f9786a8160405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561063b5780820380516001836020036101000a031916815260200191505b509250505060405180910390a15b5b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156106d95781600260005082815481101561000257906000526020600020906003020160005b506002016000828282505401925050819055505b5b5050565b6000600160149054906101000a900460ff1614156107b057600060005054421015156107af576001600160146101000a81548160ff021916908302179055507f2e4f43c0f14bc7bb1ab198f4f8d7a3e484c4a51e89361c08a3429b78d5825d2b60405180806020018281038252603a8152602001807f5375626d697373696f6e20616e6420566f74696e672068617320656e6465642e81526020017f20566f7465732077696c6c20626520636f756e746564206e6f7700000000000081526020015060400191505060405180910390a15b5b5b565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156109ac5760026000506000815481101561000257906000526020600020906003020160005b509150600190505b6002600050805490508110156108b057600260005081815481101561000257906000526020600020906003020160005b5060020160005054826002016000505410156108a257600260005081815481101561000257906000526020600020906003020160005b50915081505b5b8080600101915050610836565b7fce46666646d094a916ebd56f1aadb5317e8d5562e536ac7e23847164c428cfd982600101600050604051808060200180602001838103835260178152602001807f5468652057696e6e6572206f662074686520566f74653a00000000000000000081526020015060200183810382528481815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561099c5780601f106109715761010080835404028352916020019161099c565b820191906000526020600020905b81548152906001019060200180831161097f57829003601f168201915b5050935050505060405180910390a15b5b505056',
           gas: 3000000
         }, function(e, success){
          console.log(e, success);
          if (typeof success.address != 'undefined') {
             console.log('Contract mined! address: ' + success.address + ' transactionHash: ' + success.transactionHash);
             contract = success;
             fs.writeFile('./contract.txt', success.address + "\n", function(err) {
               if (!err) {
                 console.log("Successfully stored your contract's address locally.");
                 cb(contract, contract.plant()[1]);
               }
             });
          }
       })


  });
}

function addFunds(amount, timestamp, contract, address) {
  var gasprice = web3.eth.gasPrice.toString(10);

  contract.newFunds(amount, {from:address, gas: 3000000, gasPrice: gasprice}, function(err,success) {
    if (success) {
      //we write the timestamp of the latest tx locally to lasttx.txt
      fs.writeFile('./lasttx.txt', timestamp, function(err) {
        if (!err) {
          console.log("Successfully added %d to the Plantoid's contract.", amount);
          return true;
        }
      });
    }
  });
}

function addRecipient(contract, address, cb) {
  var gasprice = web3.eth.gasPrice.toString(10);

  console.log('\n#### Adding New Recipients ####');
  prompt.get({
    properties: {
      name: {
        description: "What is the Name of the recipient".magenta
      },
      btcaddr: {
        description: "The Bitcoin Address of the recipient".magenta
      },
      amount: {
        description: "How much of the total (in %, but enter only the amount) should the recipient receive".magenta
      }
    }
  }, function(error,result) {
    contract.addRecipients(result.name.trim(), result.btcaddr.trim(), parseInt(result.amount.trim()), {from:address, gas: 300000, gasPrice: gasprice}, function(err,success) {
      if (success) {
        console.log("Successfully added %s as a recipient.", result.amount);
        console.log("\nWould you like to add another recipient? (Y or N)\n");
        prompt.get(['choice'], function(err, result) {
          if (result.choice === "Y") {
            addRecipient(contract, address, cb);
          }
          else {
            cb(contract);
          }
        });
      }
    });
  });
}

function addNode(contract, address, cb) {
  var gasprice = web3.eth.gasPrice.toString(10);

  console.log('\n#### Adding New Child Node ####');

  prompt.get({
    properties: {
      ethaddr: {
        description: "What is the Ethereum Contract Address of the Plant".magenta
      }
    }
  },function(error,result) {
    contract.addChild(result.ethaddr.trim(), {from:address, gas: 300000, gasPrice: gasprice}, function(err, success) {
      if (success) {
        console.log("Successfully added %s as a child to plant %s", result.ethaddr, address);
        cb(contract)
      }
    })
  });
}


/****
  ***
  ***   SUBMISSIONPHASE CONTRACT FUNCTIONS
  ***
  ***/


function voteCount(address, contract, ethaddress) {
  var artists = [{'index': 0, 'btcaddr': '', 'txlist': ''}];
  addressTx(address, contract, ethaddress, prepareTx, 0)
}

function prepareTx(responses, address, contract, ethaddress, cb, artistindex) {
  cb(responses, 0, address, contract, ethaddress, artistVoteCount, artistindex);
}

function artistVoteCount(address_list, artistindex) {
  fs.readFile('./alltxs.txt', 'utf8', function(error, success) {
    if (success) {
      var previous_txs = [];
      // We read all of the previous txs and put them into an array
      success.split("\n").forEach(function(tx) {
        if (tx) {
          previous_txs.push(JSON.parse(tx));
        }
      })

      // We create a list of all the addresses that sent a transaction
      var totalvalue = 0;
      address_list.forEach(function(voteraddr) {

        for (var i = 0; i < previous_txs.length; i++) {
          if (previous_txs[i]['from'] === voteraddr) {
            //console.log(previous_txs[i]['from'], previous_txs[i]['value']);
            totalvalue += previous_txs[i]['value'];
          }
        }
      });
      console.log(totalvalue)
    }
  })
}


/****
  ***
  ***   CONTRACT FILTERS
  ***
  ***/


function eventSubmissionStart(contract) {
  //
  //  SubmissionState Event from Plantoid Contract.
  //  Activated when Threshold reached
  //
  console.log("Contract Event filter setup");

  var filter = contract.SubmissionState({}, {fromBlock: web3.eth.blockNumber, toBlock: 'latest'}, function(err,result) {
    if (!err) {
      fs.appendFile('./contract.txt',result['args']['a'] + "\n", function(err) {
        if (!err) {
          console.log("Submission phase has successfully started!");
          eventSubmissionEnd(result['args']['a']);
        }
      });
    }
  });
}

function eventSubmissionEnd(submcontract) {
  var submissionphaseContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"isEnd","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"submissions","outputs":[{"name":"btcaddress","type":"string"},{"name":"linktoproposal","type":"string"},{"name":"weightedVote","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"countVotes","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_artistbtc","type":"string"},{"name":"_linktoproposal","type":"string"}],"name":"newSubmission","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_weightedVote","type":"uint256"},{"name":"submissionid","type":"uint256"}],"name":"newVote","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"},{"indexed":false,"name":"link","type":"string"}],"name":"WinnerVoted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"}],"name":"Submitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"}],"name":"SubmissionState","type":"event"}]);

  var submissionphase = submissionphaseContract.at(submcontract);

  var filter = submissionphase.SubmissionState({}, {fromBlock: web3.eth.blockNumber, toBlock: 'latest'}, function(err,result) {
    if (!err) {
      console.log("Submission phase ended, counting votes now");
    }
  });
}


/****
  ***
  ***   BITCOIN ADDRESS FUNCTIONS
  ***
  ***/


function addressTx(address, contract, ethaddress, cb, artistindex) {
  /***
    **  Two out of Four "Truth Check"
    **  We make txreceived request to four blockchain explorers (Blockchain.info, Blockr.io, Blocktrail.com, Blockcypher.com)
    **  If two out of four report the same results, we treat it as "true"
   ***/

   var blockchaininfo = 'https://blockchain.info/address/' + address + '?format=json';
   var blocktrail = 'https://api.blocktrail.com/v1/BTC/address/' + address + '/transactions?api_key=a4dd8ed9b63845168e42a93d7a967745ca365bde';
   //var blockr = 'https://btc.blockr.io/api/v1/address/txs/' + address;
   var blockcypher = 'https://api.blockcypher.com/v1/btc/main/addrs/' + address + '/full';

   var options = {
     'blockchaininfo': blockchaininfo,
     'blocktrail': blocktrail,
     //'blockr': blockr,
     'blockcypher': blockcypher
   };
   var responses = [];

   async.forEachOf(options, function(element, key) {
     request(element, function(error, response, body) {

       if (!error && response.statusCode == 200) {
         var data = {'api':key, 'data':body};
         responses.push(data);

         if (responses.length === 3) {
           //TODO: Check if responses empty
           cb(responses, address, contract, ethaddress, explorers, artistindex);
         }
       }
       else {
         /**
         ** One of the API's is unreachable, if two of the api's successfully returned our request, we continue
         **/
         if (responses.length >= 2) {
           //TODO: Check if responses empty
           cb(responses, address, contract, ethaddress, explorers, artistindex);
         }
       }
     });
   });
}

function readlasttx(responses, address, contract, ethaddress, cb, artistindex) {
  /**
  **   UGLY hack for simplicity reasons. We can later change it go through the bitcoin address on startup and get unix timestamp so that we know the time of the latest tx. This should do for now...
  **/
  fs.readFile('./lasttx.txt', 'utf8', function(err, success) {
    if (success) {
      cb(responses, success, address, contract, ethaddress, false, artistindex);
    }
  });
}

function explorers(responses, timestamp, address, contract, ethaddress, cb, artistindex) {
  var all_txs = [];
  responses.forEach(function(element, index) {
    if (element.api === 'blockchaininfo') {
      var txs = blockchaininfoTx(JSON.parse(element.data), timestamp, address);
      all_txs.push(txs);
    }
    else if (element.api === 'blocktrail') {
      var txs = blocktrailTx(JSON.parse(element.data), timestamp, address);
      all_txs.push(txs);
    }
    else {
      var txs = blockcypherTx(JSON.parse(element.data), timestamp, address);
      all_txs.push(txs);
    }

    if (all_txs.length === responses.length) {
      truthcheck(all_txs, contract, ethaddress, address, cb, artistindex);
    }
  });
}

function blockchaininfoTx(data, timestamp, address) {
  //We iterate over all the transactions we got from the callback
  var list_tx = [];

  data['txs'].forEach(function(tx) {
    //If a transaction is newer than the last one we recorded, we iterate over its outputs
    if (tx['time'] > timestamp) {
      // If inputs are from plantowner, we do not care.
      for (var i = 0; i < tx['inputs'].length; i++) {

        if (tx['inputs'][i]['prev_out']['addr'] != address) {
          tx['out'].forEach(function(output) {
            // If the output equals to the address of the plant, we add the tx to our obj
            if (output['addr'] === address) {
              var new_tx = {'value':output['value'], 'from':tx['inputs'][i]['prev_out']['addr'], 'timestamp': tx['time'], 'txhash':tx['hash']};
              list_tx.push(new_tx);
            }
          });
        }
      }
    }
  });

  return list_tx;
}

function blocktrailTx(data, timestamp, address) {
  var list_tx = [];

  data['data'].forEach(function(tx) {
    if (Date.parse(tx['time'])/1000 > timestamp) {
      for (var i = 0; i < tx['inputs'].length; i++) {
        if (tx['inputs'][i]['address'] != address) {
          tx['outputs'].forEach(function(output) {
            if (output['address'] === address) {
              var new_tx = {'value':output['value'], 'from':tx['inputs'][i]['address'], 'timestamp': Date.parse(tx['time'])/1000, 'txhash': tx['hash']};
              list_tx.push(new_tx);
            }
          });
        }
      }
    }
  });

  return list_tx;
}

function blockcypherTx(data, timestamp, address) {
  var list_tx = [];

  data['txs'].forEach(function(tx) {
    if (Date.parse(tx['confirmed'])/1000 > timestamp) {
      for (var i = 0; i < tx['inputs'].length; i++) {
        if (tx['inputs'][i]['addresses'][0] != address) {
          tx['outputs'].forEach(function(output) {
            if (output['addresses'][0] === address) {
              var new_tx = {'value':output['value'], 'from':tx['inputs'][i]['addresses'][0], 'timestamp': Date.parse(tx['confirmed'])/1000, 'txhash': tx['hash']};
              list_tx.push(new_tx);
            }
          });
        }
      }
    }
  });

  return list_tx;
}

function truthcheck(txs, contract, ethaddress, address, cb, artistindex) {
  /**
  **  Truth check, if a transaction is in two API callbacks, we treat it as a valid tx
  **  This is rather inefficient and ugly code, would appreciate suggestions to make it better
  **/

  var list_txs = [];
  var address_list = [];
  var txs_and_values = [];

  txs.forEach(function(apis) {
    apis.forEach(function(tx) {
      if (tx['from'] != address) {
        list_txs.push(tx['txhash']);
        var tx_value = [tx['txhash'],tx['value'], tx['timestamp'], tx['from']];
        txs_and_values.push(tx_value);
      }
    });
  });

  //We sort the array by timestamp
  txs_and_values.sort(function(a,b) {
    return (a[2] > b[2]) ? 1 : ((b[2] > a[2]) ? -1 : 0);
  });

  var tx_counts = [];
  var valuesum = 0;
  var latesttimestamp = 0;

  list_txs.forEach(function(tx, index) {
    if (tx) {
      var new_tx = {};
      new_tx['hash'] = tx;
      new_tx['count'] = 0;

      for (var i = 0; i < list_txs.length; i++) {
        if (tx === list_txs[i]) {
          new_tx['count'] += 1;
          list_txs[i] = '';
        }
      }

      if (new_tx['count'] >= 2) {
        for (var i = 0; i < txs_and_values.length; i++) {
          if (txs_and_values[i][0] === new_tx['hash']) {
            valuesum += txs_and_values[i][1];
            new_tx['value'] = txs_and_values[i][1];
            new_tx['from'] = txs_and_values[i][3];
            address_list.push(txs_and_values[i][3]);
            latesttimestamp = Math.max(latesttimestamp, txs_and_values[i][2]);
            break;
          }
        }
        tx_counts.push(new_tx);

        // We store all of the recorded transactions locally on the RPi
        fs.appendFile('./alltxs.txt', JSON.stringify(new_tx) + "\n");
      }
    }
  });

  if (cb) {
    cb(address_list, artistindex);
  }
  else {
    //addFunds(valuesum, latesttimestamp, contract, ethaddress);
  }
}

module.exports = {
  deployContract: deployContract,
  addFunds: addFunds,
  addRecipient: addRecipient,
  addNode: addNode,
  voteCount: voteCount,
  eventSubmissionStart: eventSubmissionStart,
  eventSubmissionEnd: eventSubmissionEnd,
  readlasttx: readlasttx,
  addressTx: addressTx
}
