const Web3 = require('web3');
const web3 = new Web3("http://localhost:8545");

const charity = artifacts.require("Charity");
var chai = require("chai");
//var chaiAsPromised = require("chai-as-promised");
//chai.use(chaiAsPromised);

const expect = chai.expect;
let account;


before(async() => {
  Charity= await charity.new();

  accounts = await web3.eth.getAccounts();

//  console.log("OK");

});
contract("Charity Test", async accounts => {
   // const [ initialHolder, recipient, anotherAccount ] = accounts;

    
  it("allows createFundingBeneficiaryRequest",async () => {
    console.log("request description:");



    await Charity.creatBenificiary({from:accounts[1]});
    await Charity.benificiaryCreateProject("Project0",0,2,{from:accounts[1]});
    await Charity.createFundingBeneficiaryRequest('request 1', 2, 0,0,{ from:accounts[1]});
  
    const request = await Charity.requests(0);
    console.log("request description:",request.description,request.account);
   // assert.strictEqual('request 1', request.description);
   });
 
    it("create donators",async () => {
      const donator = await Charity.creatDonator('donar 1',4,{ from:accounts[1]});
      assert.ok(donator);
    });
 

    it(" make a donation",async () => {
      const donation = await Charity.donation(100,{ from:accounts[1] }); // we pass project id
      assert.ok(donation);
     });
 
 
     it("donarotVotesRequset ==> creat request",async () => {
 
     try {
       await Charity.donarotVotesRequset(40,true,{
         from: accounts[0]
       });
       assert(false);
     } catch (err){
       assert(err);
     }
 
      let amount=web3.utils.toWei('1','ether');
       await Charity.createFundingBeneficiaryRequest('books for childre', amount , accounts[2],{ from: accounts[2]});
 
       let balance = await web3.eth.getBalance(accounts[1]);
       balance = web3.utils.fromWei(balance, 'ether');
       balance = parseFloat(balance);
 
       assert(balance > 100);
     });
     
     it("send money to beneficiary",async () => {
 
       const hash = await Charity.beneficiaryGetMoney(0,{ from:accounts[0] }); // instead of 0 we pass payment id
       assert.ok(hash);
 
      });
 
 
 
 ///});
 
});

