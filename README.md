# Young ERC20 Eth Token 



[![](http://img.youtube.com/vi/IVAbVBROWIQ/0.jpg)](https://www.youtube.com/watch?v=IVAbVBROWIQ "")


https://www.youtube.com/watch?v=IVAbVBROWIQ



0xF90b2cBEcFA1E172C1d7C96133f7A19a07DB7C43


0x0985afd9f4461D95a0B826b194eBF86da10C7578




geth attach ~/.rinkeby/geth.ipc

geth --rinkeby --networkid=4 --datadir=$HOME/.rinkeby --cache=512 --allow-insecure-unlock --http --http.addr 127.0.0.1 --http.port 8545 --http.corsdomain "" --http.api "admin,eth,debug,net,txpool,personal,web3" --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303





youngseok@youngseok-VirtualBox:~/YoungEthCoin$ truffle migrate --network rinkeby --reset
Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xa3301918e2ba2ab7bf27ae6f00f8713a5acce912dcdf1cad498386bd7aebc62f
  Migrations: 0xdb94770cd69bddc9b6695cc4a3928b79b963e056
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing YoungEthToken...
  ... 0x8232aaee22228c5318609551c937c11d00ec548434adc3c1a38ba6da692f3b15
  YoungEthToken: 0xf90b2cbecfa1e172c1d7c96133f7a19a07db7c43
  Replacing YoungTokenSale...
  ... 0x17a997b29068e8d60bd8e96710111700e3d9df686501bfe7d03d9093ff41823b
  YoungTokenSale: 0x0985afd9f4461d95a0b826b194ebf86da10c7578
Saving artifacts...
