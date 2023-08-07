// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract value{
    uint8 public count=0;
    mapping (uint8=>string) public valueList;

    function getValue(string memory item) public{
        valueList[count++]=item;
    }
}