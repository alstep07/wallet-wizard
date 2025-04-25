// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DailyCheckIn {
    mapping(address => uint256) public lastCheckIn;
    mapping(address => uint256) public streakCount;
    
    event CheckedIn(address indexed user, uint256 streak);
    
    function checkIn() public {
        require(canCheckIn(msg.sender), "Already checked in today");
        
        uint256 lastCheckInTime = lastCheckIn[msg.sender];
        uint256 currentStreak = streakCount[msg.sender];
        
        // If it's been more than 48 hours since last check-in, reset streak
        if (block.timestamp - lastCheckInTime > 2 days) {
            currentStreak = 0;
        }
        
        lastCheckIn[msg.sender] = block.timestamp;
        streakCount[msg.sender] = currentStreak + 1;
        
        emit CheckedIn(msg.sender, currentStreak + 1);
    }
    
    function canCheckIn(address user) public view returns (bool) {
        return block.timestamp - lastCheckIn[user] >= 1 days;
    }
    
    function getStreak(address user) public view returns (uint256) {
        return streakCount[user];
    }
    
    function getLastCheckIn(address user) public view returns (uint256) {
        return lastCheckIn[user];
    }
} 