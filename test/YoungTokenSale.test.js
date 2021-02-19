var YoungTokenSale = artifacts.require('./YoungTokenSale.sol');
var YoungEthToken = artifacts.require('./YoungEthToken');

contract('YoungTokenSale',async(account) =>{
	let owner = accounts[0];
	let buyer = accounts[1];
	let tokensToSell = 500000;
	let tokenPrice = 1000000000000000;
	let numberOfTokens;

	it('initialises the correct with the correct values', async() => {
	let tokenSaleInstance = await YoungTokenSale.deployed();
	
	let tokenSaleAddress = await tokenSaleInstance.address;
	assert.notEqual(tokenSaleAddress, 0x0, 'has an address');
	
	let tokenAddress = await tokenSaleInstance.tokenContract();
	assert.notEqual(tokenAddress,0x0,'has an address');
	
	let tokenPrice = await tokenSaleInstance.tokenPrice();
	assert.equal(tokenPrice,1000000000000000,'sets the correct token price');
	});
	
	
	it('allows users to buy tokens', async() => {
	let tokenSaleInstance = await YoungTokenSale.deployed();
	let tokenInstance = await YoungEthToken.deployed();
	
	let success = await tokenInstance.transfer(
		tokenSaleInstance.address, tokensToSell, { from: owner});
		
	numberOfTokens = 40;
	let receipt = await tokenSaleInstance.buyTokens(
		numberOfTokens, {from:buyer,value: numberOfTokens * tokenPrice});
		
	let buyerBalance = await tokenInstance.balanceOf(buyer);
	assert.equal(buyerBalance,numberOfToken);
	
	let contractBalance = await tokenInstance.balanceOf(
		tokenSaleInstance.address);
	assert.equal(contractBalance,tokensToSell - numberOfTokens);
	
	
});
