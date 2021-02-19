pragma solidity ^0.4.24;

contract YoungEthToken {
	string public name = "YoungEth ERC20 Token";
	string public symbol = "YET";	//YoungEthereumToken
	
	uint256 public totalSupply;	//all account total token
	
	mapping (address => uint256) public balanceOf;
	mapping(address=>mapping(address=>uint256)) public allowance;
	
	
	
	constructor(uint256 _initialSupply) public {
	balanceOf[msg.sender] = _initialSupply;
	totalSupply = _initialSupply;
	emit Transfer(address(0), msg.sender, totalSupply);
	}
	
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);
	
	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	//According to the standard ERC20 success for token 'a'address to 'b'address must transfer event need
	
	function transfer(address _to, uint256 _value)
	public
	returns (bool success)

	{
	require(balanceOf[msg.sender] >= _value);
	balanceOf[msg.sender] -= _value;
	balanceOf[_to] += _value;
	emit Transfer(msg.sender, _to, _value);
	return true;
	}


	function approve(address _spender, uint256 _value)
	public
	returns (bool success)
	
	{
	allowance[msg.sender][_spender]=_value;
	emit Approval(msg.sender, _spender, _value);
	return true;
	}
	
	
	function transferFrom(address _from, address _to, uint256 _value)
	public
	returns (bool success)
	{
	require(_value <=balanceOf[_from]);
	require(_value <=allowance[_from][msg.sender]);
	
	balanceOf[_from] -= _value;
	balanceOf[_to] +=_value;
	allowance[_from][msg.sender] -= _value;
	emit Transfer(_from, _to, _value);
	return true;
	}
	
	
	
	
	
}
