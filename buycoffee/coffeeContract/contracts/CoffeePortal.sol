// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CoffeePortal {
    uint256 totalCoffee;
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    // TODO:  Add event params
    event NewCoffee();

    struct Coffee {
        address sender;
        string message;
        string name;
        uint256 timestamp;
    }

    // TODO: Declare Object array

    function getAllCoffee() public view returns (Coffee[] memory) {
        // TODO: return Array
    }

    function getTotalCoffee() public view returns (uint256) {
        // TODO: return count variable
    }

    function buyCoffee(
        string memory _message,
        string memory _name
    ) public payable {
        // TODO: implement buyCoffee logic
    }
}
