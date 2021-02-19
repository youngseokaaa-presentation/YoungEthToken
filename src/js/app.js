App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 0,
  tokensSold: 0,
  tokensAvailable: 500000,

  init: function() {
 
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);

    }
    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("YoungTokenSale.json", function(youngTokenSale) {
    
      App.contracts.YoungTokenSale = TruffleContract(youngTokenSale);
      App.contracts.YoungTokenSale.setProvider(App.web3Provider);
      App.contracts.YoungTokenSale.deployed().then(function(youngTokenSale) {
        console.log("Dapp Token Sale Address:", youngTokenSale.address);
      });
    }).done(function() {
      $.getJSON("YoungEthToken.json", function(youngEthToken) {
        App.contracts.YoungEthToken = TruffleContract(youngEthToken);
        App.contracts.YoungEthToken.setProvider(App.web3Provider);
        App.contracts.YoungEthToken.deployed().then(function(youngEthToken) {
          console.log("Dapp Token Address:", youngEthToken.address);
        });

        App.listenForEvents();
        return App.render();
      });
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.YoungTokenSale.deployed().then(function(instance) {
      instance.Sell({fromBlock:0,toBlock:'latest'},function(error,event) 
      {
        console.log("event triggered", event);
        App.render();
      });
    });
  },

  render: function() {
    if (App.loading) {
      return;
    }
    App.loading = true;

    const loader  = $('#contentLoader');
    const content = $('#content');

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $('#accountAddress').html(account);
      }
    });

    App.contracts.YoungTokenSale.deployed().then(function(instance) {
      YoungTokenSaleInstance = instance;
      return YoungTokenSaleInstance.tokenPrice();
    }).then(function(tokenPrice) {
      App.tokenPrice = tokenPrice;
      $('#tokenPrice').html(web3.utils.fromWei(App.tokenPrice, "ether"));
      console.log(web3.utils.fromWei(App.tokenPrice,"ether"));
      return YoungTokenSaleInstance.tokensSold();
    }).then(function(tokensSold) {
      App.tokensSold = tokensSold.toNumber();
      $('#tokensSold').html(App.tokensSold);
      $('#tokensAvailable').html(App.tokensAvailable);

      var progress = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      $('#progress').css('width', progress + '%');

      App.contracts.YoungEthToken.deployed().then(function(instance) {
        YoungEthTokenInstance = instance;
        return YoungEthTokenInstance.balanceOf(App.account);
      }).then(function(balance) {
        $('#tokenBalance').html(balance.toNumber());
        return YoungEthTokenInstance.name();
      }).then(function(name) {
        $('#tokenName').html(name);
        return YoungEthTokenInstance.symbol();
      }).then(function(symbol) {
        $('#tokenSymbol').html(symbol);
        App.loading = false;
        loader.hide();
        content.show();
      });
    });
  },

  buyTokens: function() {
    $('#content').hide();
    $('#contentLoader').show();
    const numberOfTokens = $('#numberOfTokens').val();
    App.contracts.YoungTokenSale.deployed().then(function(instance) {
      return instance.buyTokens(numberOfTokens, {
        from: App.account,
        value: numberOfTokens * App.tokenPrice,
      });
    }).then(function(result) {
      console.log(result);
      $('form').trigger('reset');
    });
  }
};

App.init();
