pragma solidity 0.8.19;

contract HackBoardRegistry{
    address public HackBoardAdmin;
    uint256[] public AllTeams;
    uint256 public TeamIncrement;

    constructor(){
        HackBoardAdmin = 0xc932b3a342658A2d3dF79E4661f29DfF6D7e93Ce;

    }
    
    struct Team{
        string name;
        string description;
        string discord;
        string bountyTargets;
        address teamToken;
        bool interest;
        bool pledge;
    }

    mapping (address=>Team) public teams;
    address[] public teamList;
    address[] public tokenList;

    function RegisterTeam(string memory name, string memory description, string memory discord, string memory bountyTargets, bool interestedInPredictionMarket, bool pledgedToDistributePrize, string memory tokenName, string memory tokenSymbol) public {
        require(!teamCreated(msg.sender));

        address teamToken = address(new Token(string(abi.encodePacked(name, " Coin")), tokenSymbol));

        teams[msg.sender] = Team(name, description, discord, bountyTargets, teamToken, interestedInPredictionMarket, pledgedToDistributePrize);
        
        tokenList.push(teamToken); //For easy access on the frontend

        teamList.push(msg.sender);
    }

    function registerTeamAdmin(address team, string memory name, string memory description, string memory discord, string memory bountyTargets, bool interestedInPredictionMarket) public {
        require(msg.sender==HackBoardAdmin);
        address teamToken = address(new Token(string(abi.encodePacked(name, " Coin")), name));

        teams[msg.sender] = Team(name, description, discord, bountyTargets, teamToken, interestedInPredictionMarket, false);
        
        tokenList.push(teamToken); //For easy access on the frontend

        teamList.push(msg.sender);
    }

    function teamCreated(address _address) public view returns (bool) {
        return bytes(teams[_address].name).length > 0;
    }


    function updateName(string memory _name) public {
        require(teamCreated(msg.sender));
        teams[msg.sender].name = _name;
    }

    function updateDescription(string memory _description) public {
        require(teamCreated(msg.sender));
        teams[msg.sender].description = _description;
    }
    function updateDiscord(string memory _discord) public {
        require(teamCreated(msg.sender));
        teams[msg.sender].discord = _discord;
    }
    function updateMainBountyTarget(string memory _description) public {
        require(teamCreated(msg.sender));
        teams[msg.sender].description = _description;       
    }

    function updateInterest(bool _interest) public {
        require(teamCreated(msg.sender));
        teams[msg.sender].interest = _interest;
    }

    function updatePledge(bool _pledge) public {
        require(teamCreated(msg.sender));
        teams[msg.sender].pledge = _pledge;
    }

    function GetTeamInfo(uint256 TeamID) public view returns(Team memory){
        return teams[teamList[TeamID]];
    }
}


contract Token {
    uint256 public totalSupply = 1000000e18;
    string public name;
    string public symbol;
    uint8 public decimals;
    address private ZeroAddress;
    //variable Declarations
    

    event Transfer(address indexed from, address indexed to, uint256 value);    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event BurnEvent(address indexed burner, uint256 indexed buramount);
    event ManageMinterEvent(address indexed newminter);
    //Event Declarations 
    
    mapping(address => uint256) public balances;

    mapping(address => mapping (address => uint256)) public allowance;
    
    constructor(string memory _name, string memory _symbol){
        name = _name;
        symbol = _symbol;
        decimals = 18;
        Mint(tx.origin, totalSupply);
    }
    
    
    
    function balanceOf(address Address) public view returns (uint256 balance){
        return balances[Address];
    }

    function approve(address delegate, uint _amount) public returns (bool) {
        allowance[msg.sender][delegate] = _amount;
        emit Approval(msg.sender, delegate, _amount);
        return true;
    }
    //Approves an address to spend your coins

    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool) {
        require(_amount <= balances[_from]);    
        require(_amount <= allowance[_from][msg.sender]);
    
        balances[_from] = balances[_from]-(_amount);
        allowance[_from][msg.sender] = allowance[_from][msg.sender]-(_amount);
        balances[_to] = balances[_to]+(_amount);
        emit Transfer(_from, _to, _amount);
        return true;
    }
    //Transfer From an other address


    function transfer(address _to, uint256 _amount) public returns (bool) {
        require(_amount <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-(_amount);
        balances[_to] = balances[_to]+(_amount);
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function Mint(address _MintTo, uint256 _MintAmount) internal {
        balances[_MintTo] = balances[_MintTo]+(_MintAmount);
        totalSupply = totalSupply+(_MintAmount);
        ZeroAddress = 0x0000000000000000000000000000000000000000;
        emit Transfer(ZeroAddress ,_MintTo, _MintAmount);
    } //Can only be used on deploy, view Internal 

    function Burn(uint256 _BurnAmount) public {
        require (balances[msg.sender] >= _BurnAmount);
        balances[msg.sender] = balances[msg.sender]-(_BurnAmount);
        totalSupply = totalSupply-(_BurnAmount);
        ZeroAddress = 0x0000000000000000000000000000000000000000;
        emit Transfer(msg.sender, ZeroAddress, _BurnAmount);
        emit BurnEvent(msg.sender, _BurnAmount);
    }
}
