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

function deployContract(cb) {
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
        description: "The Smart Contract Address of the Parent".magenta
      },
      threshold: {
        description: "What is the Fundraiser Threshold".magenta
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

      var plantoid = plantoidContract.new(
         result.btcaddr.trim(),
         result.artist.trim(),
         result.parent.trim(),
         threshold,
         {
           from: address,
           data: '606060405260405161174c38038061174c833981016040528080518201919060200180519060200190919080519060200190919080519060200190919050505b8360006000506001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009457805160ff19168380011785556100c5565b828001600101855582156100c5579182015b828111156100c45782518260005055916020019190600101906100a6565b5b5090506100f091906100d2565b808211156100ec57600081815060009055506001016100d2565b5090565b505033600060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555082600060005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600060005060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060005060030160146101000a81548160ff0219169083021790555080600060005060040160005081905550600760005080548060010182818154818355818115116102855760030281600302836000526020600020918201910161028491906101ed565b80821115610280576000600082016000506000905560018201600050805460018160011615610100020316600290046000825580601f1061022e575061026b565b601f01602090049060005260206000209081019061026a919061024c565b80821115610266576000818150600090555060010161024c565b5090565b5b506002820160005060009055506001016101ed565b5090565b5b5050509190906000526020600020906003020160005b6060604051908101604052807f506172656e7420506c616e740000000000000000000000000000000000000000815260200188815260200160018152602001509091909150600082015181600001600050556020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061034257805160ff1916838001178555610373565b82800160010185558215610373579182015b82811115610372578251826000505591602001919060010190610354565b5b50905061039e9190610380565b8082111561039a5760008181506000905550600101610380565b5090565b5050604082015181600201600050555050505b50505050611389806103c36000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480631eee993a14610065578063779b3c5c1461007d57806386f9b9431461018e578063d1bc76a1146101f6578063e570c9ed146102b257610063565b005b61007b60048080359060200190919050506106b8565b005b61008a60048050506107cf565b604051808873ffffffffffffffffffffffffffffffffffffffff168152602001806020018773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018381526020018281038252888181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101795780601f1061014e57610100808354040283529160200191610179565b820191906000526020600020905b81548152906001019060200180831161015c57829003601f168201915b50509850505050505050505060405180910390f35b6101f46004808035906020019091908035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190803590602001909190505061041c565b005b61020c6004808035906020019091905050610877565b60405180848152602001806020018381526020018281038252848181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102a15780601f10610276576101008083540402835291602001916102a1565b820191906000526020600020905b81548152906001019060200180831161028457829003601f168201915b505094505050505060405180910390f35b6102c860048080359060200190919050506102ca565b005b6000600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561041757816000600050600501600082828250540192505081905550600060005060040160005054600060005060050160005054101515610416576000600060005060050160005081905550604051610ad0806108b9833901809050604051809103906000f090507f712fa0272968e5dadb2461889ccb90ae40002fb90910565d701d0ae2eb17d2888160405180806020018373ffffffffffffffffffffffffffffffffffffffff168152602001828103825260188152602001807f5375626d697373696f6e205068617365207374617274656400000000000000008152602001506020019250505060405180910390a15b5b5b5050565b600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806104d15750600060005060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b156106b257600760005080548060010182818154818355818115116105a7576003028160030283600052602060002091820191016105a6919061050f565b808211156105a2576000600082016000506000905560018201600050805460018160011615610100020316600290046000825580601f10610550575061058d565b601f01602090049060005260206000209081019061058c919061056e565b80821115610588576000818150600090555060010161056e565b5090565b5b5060028201600050600090555060010161050f565b5090565b5b5050509190906000526020600020906003020160005b606060405190810160405280878152602001868152602001858152602001509091909150600082015181600001600050556020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061064357805160ff1916838001178555610674565b82800160010185558215610674579182015b82811115610673578251826000505591602001919060010190610655565b5b50905061069f9190610681565b8082111561069b5760008181506000905550600101610681565b5090565b5050604082015181600201600050555050505b5b505050565b600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156107cb576001600060005060030160146101000a81548160ff021916908302179055506000600050600601600050805480600101828181548183558181151161078b5781836000526020600020918201910161078a919061076c565b80821115610786576000818150600090555060010161076c565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550505b5b50565b60006000508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101600050908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160149054906101000a900460ff16908060040160005054908060050160005054905087565b600760005081815481101561000257906000526020600020906003020160005b91509050806000016000505490806001016000509080600201600050549050835660606040526000600160146101000a81548160ff021916908302179055505b62278d00420160006000508190555032600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b610a69806100676000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480632fc6e8b71461005a578063ad73349e14610069578063d39fdce7146101a7578063d53b92931461024457610058565b005b61006760048050506106c4565b005b61007f6004808035906020019091905050610265565b6040518080602001806020018481526020018381038352868181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101125780601f106100e757610100808354040283529160200191610112565b820191906000526020600020905b8154815290600101906020018083116100f557829003601f168201915b50508381038252858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101955780601f1061016a57610100808354040283529160200191610195565b820191906000526020600020905b81548152906001019060200180831161017857829003601f168201915b50509550505050505060405180910390f35b6102426004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506102a6565b005b6102636004808035906020019091908035906020019091905050610634565b005b600260005081815481101561000257906000526020600020906003020160005b91509050806000016000509080600101600050908060020160005054905083565b6000600160149054906101000a900460ff16141561062f57600260005080548060010182818154818355818115116103ee576003028160030283600052602060002091820191016103ed91906102f7565b808211156103e957600060008201600050805460018160011615610100020316600290046000825580601f1061032d575061036a565b601f016020900490600052602060002090810190610369919061034b565b80821115610365576000818150600090555060010161034b565b5090565b5b5060018201600050805460018160011615610100020316600290046000825580601f1061039757506103d4565b601f0160209004906000526020600020908101906103d391906103b5565b808211156103cf57600081815060009055506001016103b5565b5090565b5b506002820160005060009055506001016102f7565b5090565b5b5050509190906000526020600020906003020160005b606060405190810160405280868152602001858152602001600081526020015090919091506000820151816000016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061047e57805160ff19168380011785556104af565b828001600101855582156104af579182015b828111156104ae578251826000505591602001919060010190610490565b5b5090506104da91906104bc565b808211156104d657600081815060009055506001016104bc565b5090565b50506020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061053157805160ff1916838001178555610562565b82800160010185558215610562579182015b82811115610561578251826000505591602001919060010190610543565b5b50905061058d919061056f565b80821115610589576000818150600090555060010161056f565b5090565b5050604082015181600201600050555050507f2e4f43c0f14bc7bb1ab198f4f8d7a3e484c4a51e89361c08a3429b78d5825d2b8160405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156106215780820380516001836020036101000a031916815260200191505b509250505060405180910390a15b5b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156106bf5781600260005082815481101561000257906000526020600020906003020160005b506002016000828282505401925050819055505b5b5050565b6000600160149054906101000a900460ff16141561070d576000600050544210151561070c576001600160146101000a81548160ff0219169083021790555061070b610710565b5b5b5b565b6000600060026000506000815481101561000257906000526020600020906003020160005b509150600190505b6002600050805490508110156107b757600260005081815481101561000257906000526020600020906003020160005b5060020160005054826002016000505410156107a957600260005081815481101561000257906000526020600020906003020160005b50915081505b5b808060010191505061073d565b6109268260606040519081016040529081600082016000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108635780601f1061083857610100808354040283529160200191610863565b820191906000526020600020905b81548152906001019060200180831161084657829003601f168201915b50505050508152602001600182016000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109085780601f106108dd57610100808354040283529160200191610908565b820191906000526020600020905b8154815290600101906020018083116108eb57829003601f168201915b5050505050815260200160028201600050548152602001505061092b565b5b5050565b7fce46666646d094a916ebd56f1aadb5317e8d5562e536ac7e23847164c428cfd98160200151604051808060200180602001838103835260178152602001807f5468652077696e6e696e672070726f706f73616c2069730000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156109ec5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a17f2e4f43c0f14bc7bb1ab198f4f8d7a3e484c4a51e89361c08a3429b78d5825d2b60405180806020018281038252601b8152602001807f5375626d697373696f6e20706572696f642068617320656e646564000000000081526020015060200191505060405180910390a15b5056',
           gas: 3000000,
           gasPrice: gasprice
         }, function(e, success){
          console.log(e);
          if (typeof success.address != 'undefined') {
             console.log('Contract mined! address: ' + success.address + ' transactionHash: ' + success.transactionHash);
             contract = success;
             fs.writeFile('./contract.txt', success.address, function(err) {
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

  contract.newFunds(amount, {from:address, gas: 300000, gasPrice: gasprice}, function(err,success) {
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
            addRecipient();
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
  prompt.get({
    ethaddr: {
      description: "What is the Ethereum Contract Address of the Plant".magenta
    }
  },function(error,result) {
    contract.addNode(result.ethaddr.trim(), {from:address, gas: 300000, gasPrice: gasprice}, function(err, success) {
      if (success) {
        console.log("Successfully added %s as a child to plant %s", success.ethaddr, address);
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

function newVote(contract) {
  //  TODO
}


  /****
    ***
    ***   CONTRACT FILTERS
    ***
    ***/


function listener(contract) {
  //
  //  SubmissionState Event from Plantoid Contract.
  //  Activated when Threshold reached
  //
  console.log("Contract Event filter setup");

  var filter = contract.SubmissionState({}, {fromBlock: web3.eth.blockNumber, toBlock: 'latest'}, function(err,result) {
    if (!err) {
      console.log(result);
    }
    else {
      console.log(err);
    }
  });
}


  /****
    ***
    ***   BITCOIN ADDRESS FUNCTIONS
    ***
    ***/


function addressTx(address, contract, ethaddress) {
  /***
    **  Two out of Four "Truth Check"
    **  We make txreceived request to four blockchain explorers (Blockchain.info, Blockr.io, Blocktrail.com, Blockcypher.com)
    **  If two out of four report the same results, we treat it as "true"
   ***/
   var blockchaininfo = 'https://blockchain.info/address/' + address + '?format=json&limit=20';
   var blocktrail = 'https://api.blocktrail.com/v1/BTC/address/' + address + '/transactions?api_key=a4dd8ed9b63845168e42a93d7a967745ca365bde';
   //var blockr = 'https://btc.blockr.io/api/v1/address/txs/' + address;
   var blockcypher = 'https://api.blockcypher.com/v1/btc/main/addrs/' + address + '/full?&limit=20';

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
           /**
           **   UGLY hack for simplicity reasons. We can later change it go through the bitcoin address on startup and get unix timestamp so that we know the time of the latest tx. This should do for now...
           **/
           //TODO: Check if responses empty
           fs.readFile('./lasttx.txt', 'utf8', function(err, success) {
             if (success) {
               explorers(responses, success, address, contract, ethaddress);
             }
           });
         }
       }
       else {
         /**
         ** One of the API's is unreachable, if two of the api's successfully returned our request, we continue
         **/
         if (responses.length >= 2) {
           /**
           **   UGLY hack for simplicity reasons. We can later change it go through the bitcoin address on startup and get unix timestamp so that we know the time of the latest tx. This should do for now...
           **/
           //TODO: Check if responses empty
           fs.readFile('./lasttx.txt', 'utf8', function(err, success) {
             if (success) {
               explorers(responses, success, address, contract, ethaddress);
             }
           });
         }
       }
     });
   });
}

function explorers(responses, timestamp, address, contract, ethaddress) {
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
      truthcheck(all_txs, contract, ethaddress);
    }
  });
}

function blockchaininfoTx(data, timestamp, address) {
  //We iterate over all the transactions
  var list_tx = [];

  data['txs'].forEach(function(tx) {
    //If a transaction is newer than the last one we recorded, we iterate over its outputs
    if (tx['time'] > timestamp) {
      tx['out'].forEach(function(output) {
        //If the output equals to the address of the plant, we add the tx to our obj
        if (output['addr'] === address) {
          //TODO: Potential problem if multiple inputs
          var new_tx = {'value':output['value'], 'from':tx['inputs'][0]['prev_out']['addr'], 'timestamp': tx['time'], 'txhash':tx['hash']};
          list_tx.push(new_tx);
        }
      });
    }
  });

  return list_tx;
}

function blocktrailTx(data, timestamp, address) {
  var list_tx = [];

  data['data'].forEach(function(tx) {
    if (Date.parse(tx['time'])/1000 > timestamp) {
      tx['outputs'].forEach(function(output) {
        if (output['address'] === address) {
          var new_tx = {'value':output['value'], 'from':tx['inputs'][0]['address'], 'timestamp': Date.parse(tx['time'])/1000, 'txhash': tx['hash']};
          list_tx.push(new_tx);
        }
      });
    }
  });

  return list_tx;
}

function blockcypherTx(data, timestamp, address) {
  var list_tx = [];

  data['txs'].forEach(function(tx) {
    if (Date.parse(tx['confirmed'])/1000 > timestamp) {
      tx['outputs'].forEach(function(output) {
        if (output['addresses'][0] === address) {
          var new_tx = {'value':output['value'], 'from':tx['inputs'][0]['addresses'][0], 'timestamp': Date.parse(tx['confirmed'])/1000, 'txhash': tx['hash']};
          list_tx.push(new_tx);
        }
      });
    }
  });

  return list_tx;
}

function truthcheck(txs, contract, ethaddress) {
  /**
  **  Truth check, if a transaction is in two API callbacks, we treat it as a valid tx
  **  This is rather inefficient and ugly code, would appreciate suggestions to make it better
  **/
  var list_txs = [];
  var txs_and_values = [];

  txs.forEach(function(apis) {
    apis.forEach(function(tx) {
      list_txs.push(tx['txhash']);
      var tx_value = [tx['txhash'],tx['value'], tx['timestamp']];
      txs_and_values.push(tx_value);
    })
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
            latesttimestamp = Math.max(latesttimestamp, txs_and_values[i][2]);
            break;
          }
        }
      }
      tx_counts.push(new_tx);
    }
  });

  addFunds(valuesum, latesttimestamp, contract, ethaddress);
}

module.exports = {
  deployContract: deployContract,
  addFunds: addFunds,
  addRecipient: addRecipient,
  addNode: addNode,
  listener: listener,
  addressTx: addressTx
}
