// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

// v0.1 - 進行帳面上的買賣(無token)
contract VendingMachine {
  struct Token {
    string name; // token名
    uint256 count; // 架上剩餘數量
  }

  uint256 public tokenID;
  mapping(uint256 => Token) public stores;

  function listItemForSale(string memory _name, uint256 _count) public {
    tokenID++;
    stores[tokenID].name = _name;
    stores[tokenID].count = _count;
  }

  function purchase(uint256 _tokenID) public {
    stores[_tokenID].count = stores[_tokenID].count - 1;
  }
}
