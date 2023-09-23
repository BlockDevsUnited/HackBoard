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
        string mainBountyTarget;
        bool interestedInPredictionMarket;
        bool pledgedToDistributePrize;
    }

    mapping (address=>Team) teams;
    address[] teamList;

    function RegisterTeam(string memory name, string memory description, string memory discord, string memory mainBountyTarget, bool interestedInPredictionMarket, bool pledgedToDistributePrize) public {
        require(!teamAlreadyCreated(msg.sender));

        teams[msg.sender] = Team(name, description, discord, mainBountyTarget, interestedInPredictionMarket, pledgedToDistributePrize);
        
        teamList.push(msg.sender);
    }

    function teamAlreadyCreated(address _address) public view returns (bool) {
        return bytes(teams[_address].name).length > 0;
    }

    // function AddTeamMember(uint256 TeamID, address[] NewMembers) public {
    //     require(Teams[TeamID].Admin == msg.sender);
    //     Teams[TeamID].TeamMembers.push(NewMember);

    //     for(uint256 i = 0; i < NewMembers.length; i++){
    //         User[NewMembers[i]].HasTeam = true;
    //         User[NewMembers[i]].TeamID = TeamID;
    //     }
    // }

    function GetTeamInfo(uint256 TeamID) public view returns(Team memory){
        return teams[teamList[TeamID]];
    }

    function updateName() public {
        
    }
}
