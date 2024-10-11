// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract BetterVoting {

    // Struct to store data of voter
    struct Voter {
        bool voted;
        uint vote; // Index of the candidate voted for
        bool authorized;
    }

    // Struct to store data of candidate
    struct Candidate {
        string name;
        uint voteCount;
    }

    // owner of contract
    address public owner;

    // mapping of user account address to Voter struct
    mapping(address => Voter) private addressToVoter;

    // array to store candidates
    Candidate[] private candidates;

    // custom errors
    error Voting__AlreadyVoted();
    error Voting__NotOwner();
    error Voting__NotAuthorized();
    error Voting__NotYetVoted();

    constructor() {
        owner = msg.sender;
    }

    // modifier to check if msg sender is the owner
    modifier onlyOwner(){
        require(msg.sender == owner, Voting__NotOwner());
        _;
    }

    // only the owner is able to add candidates
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name, 0));
    }

    // only the owner can authorize voters
    function authorizeVoter(address _voter) public onlyOwner {
        addressToVoter[_voter].authorized = true;
    }

    // users can vote for candidates based on their index, but they need to be authorized first
    function vote(uint candidateIndex) public {
        Voter storage voter = addressToVoter[msg.sender];

        // Check if the voter is authorized and hasn't voted yet
        if (!voter.authorized) {
            revert Voting__NotAuthorized();
        }
        if (voter.voted) {
            revert Voting__AlreadyVoted();
        }

        // Record the vote
        voter.voted = true;
        voter.vote = candidateIndex;
        candidates[candidateIndex].voteCount++;
    }

    // get list of all candidates including their name and votes
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // check if a voter has voted
    function hasVoted(address _voter) public view returns (bool) {
        return addressToVoter[_voter].voted;
    }

    // get the vote cast by a specific voter (candidate index they voted for)
    function getVoterVote(address _voter) public view returns (uint) {
        require(addressToVoter[_voter].voted, Voting__NotYetVoted());
        return addressToVoter[_voter].vote;
    }
}
