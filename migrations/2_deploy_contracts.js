var YoungEthToken = artifacts.require('./YoungEthToken.sol');
var YoungTokenSale = artifacts.require('./YoungTokenSale.sol');

module.exports = function (deployer) {
	deployer.deploy(YoungEthToken, 1000000).then(function () {
	return deployer.deploy(YoungTokenSale,YoungEthToken.address,1000000000000000);
	});
	};
