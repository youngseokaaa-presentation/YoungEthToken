var YoungEthToken = artifacts.require('./YoungEthToken');

contract('YoungEthToken',async(accounts)=>{

	it('initialises the contract with the correct values', async()=>{
	let instance = await YoungEthToken.deployed();
	
	let name = await instance.name();
	assert.equal(name,'YoungEth ERC20 Token', 'has the correct name');
	
	let symbol = await instance.symbol();
	assert.equal(symbol,'YET','has the correct symbol');
	
	});
	
	
	it('allocates the total supply on deployment', async() => {
	let instance = await YoungEthToken.deployed();
	
	let supply = await instance.totalSupply();
	assert.equal(supply,1000000,'sets the correct total supply');
	});
	
	
});

