pragma solidity ^0.5.10;

contract CRUD {
    uint256 public maxId = 1; // because if we delete 0th element from array then getUserIndex will return index 0 as default for users[0].id will be set 0
    struct User {
        uint256 id;
        string name;
    }

    User[] public users;

    // get index for id

    function getUserIndex(uint256 _id) internal view returns (uint256 index) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                return i;
            }
        }

        revert("User does not exist");
    }

    // get user
    function getUser(uint256 _id) public view returns (uint256, string memory) {
        uint256 userIndex = getUserIndex(_id);
        return (users[userIndex].id, users[userIndex].name);
    }

    // get all user
    // function getAll() view public returns(User[] memory){
    //     return users;
    // }

    function sayHi() public returns (uint256) {
        users.push(User(maxId, "RAJAN"));
        maxId++;
        return users.length;
        // return users.length;
    }

    // add
    function addUser(string memory _name) public returns (uint256) {
        users.push(User(maxId, _name));
        maxId++;
        return users.length;
    }

    // update
    function updateUser(uint256 _id, string memory _newName) public {
        uint256 indexOfUser = getUserIndex(_id);
        users[indexOfUser].name = _newName;
    }

    // delete
    function deleteUser(uint256 _id) public {
        uint256 userIndex = getUserIndex(_id);
        delete users[userIndex];
    }
}
