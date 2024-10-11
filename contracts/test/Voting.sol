// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Voting} from "../src/Voting.sol";
import {Deploy} from "../script/Deploy.s.sol";

contract VotingTest is Test {
    Voting voting;
    address user = makeAddr("USER");
    function setUp() public {
        Deploy deploy = new Deploy();
        voting = deploy.run();
    }

    function testAddCandidate() public {
        voting.addCandidate("Lilith");
        assertEq(voting.getCandidates().length, 3);
    }

    function testOnlyOwnerCanAddCandidate() public {
        vm.prank(user);
        vm.expectRevert(Voting.Voting__NotOwner.selector);
        voting.addCandidate("Lilith");
    }


    function testVote() public {
        voting.vote(0);
        assertEq(voting.getCandidates()[0].voteCount, 1);
    }

    function testAlreadyVoted() public {
        vm.startPrank(user);
        voting.vote(0);
        vm.expectRevert(Voting.Voting__AlreadyVoted.selector);
        voting.vote(0);
        vm.stopPrank();
    }
}
