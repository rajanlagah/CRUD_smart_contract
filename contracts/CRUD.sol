pragma solidity ^0.8.0;

contract CRUD {
 uint public maxId = 1; // because if we delete 0th element from array then getUserIndex will return index 0 as default for users[0].id will be set 0
 struct User {
  uint id;
  string name;
 }

 User[] public users;

    // get index for id

    function getUserIndex(uint _id) view internal returns(uint index){
        for( uint i = 0; i < users.length ; i++){
            if(users[i].id == _id){
                return i;
            }
        }

        revert('User does not exist');
    }

    // get user 
    function getUser(uint _id) view public returns(uint, string memory){
        uint userIndex = getUserIndex(_id);
        return (users[userIndex].id,users[userIndex].name);
    }
   // get all user 
    function getAll() view public returns(User[] memory){
        return users;
    }

    // add
    function addUser(string memory _name) public returns(uint){
        users.push(User(maxId,_name));
        maxId++;
        return users.length;
    }
    
    // update
    function updateUser( uint _id, string memory _newName) public{
        uint indexOfUser = getUserIndex(_id);
        users[indexOfUser].name = _newName;
    }

    // delete
    function deleteUser(uint _id) public {
        uint userIndex = getUserIndex(_id);
        delete users[userIndex];
    }
}
