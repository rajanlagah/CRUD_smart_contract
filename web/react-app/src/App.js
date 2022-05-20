import React from "react";
import Web3 from "web3";
import { getWeb3 } from "./utils";

import logo from "./logo.svg";
import "./App.css";
import CRUD from "./contracts/CRUD.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _web3: null,
      contract: null,
      accounts: [],
      userId: 1,
      username: ""
    };
  }

  componentDidMount() {
    try {
      this.getSetWeb3();
    } catch (e) {
      console.log("ERROR IN INIT", e);
    }
  }

  getSetWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CRUD.networks[networkId];
      const contract = new web3.eth.Contract(
        CRUD.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3, accounts, contract }, this.addUser);
    } catch (e) {
      console.log("ERROR IN INIT 0", e);
    }
  };

  addUser = async () => {
    const { contract, accounts, username } = this.state;
    // debugger
    console.log("username", username);
    try {
      contract.methods
        .addUser(username)
        .send({
          from: accounts[0],
          gas: 3000000,
          gasPrice: Web3.utils.toWei("10", "gwei")
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => console.log(e.message));
    } catch (e) {
      console.log("ADD USER", e);
    }
  };

  deleteUser = async () => {
    const { contract, accounts, userId } = this.state;
    try {
      contract.methods
        .deleteUser(userId)
        .send({
          from: accounts[0],
          gas: 3000000,
          gasPrice: Web3.utils.toWei("10", "gwei")
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => {
          console.log("ERROR in delete", e);
        });
    } catch (e) {
      console.log("ERROR in delete", e);
    }
  };

  updateUser = async () => {
    const { contract, accounts, username, userId } = this.state;

    try {
      contract.methods
        .updateUser(userId, username)
        .send({
          from: accounts[0],
          gas: 3000000,
          gasPrice: Web3.utils.toWei("10", "gwei")
        })
        .then((res) => {
          console.log("RES", res);
        })
        .catch((e) => console.log("ERROR IN UPDATEING USER", e));
    } catch (e) {
      console.log("ERROR IN UPDATEING USER", e);
    }
  };

  getUser = async () => {
    const { contract, accounts, userId } = this.state;
    console.log(userId);
    try {
      contract.methods
        .getUser(parseInt(userId))
        .call()
        .then((res) => {
          console.log("res", res);
          console.log("res", res[0]);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log("GET USER", e);
    }
  };

  render() {
    const { userId, username } = this.state;
    return (
      <div>
        CRUD
        <input
          value={username}
          onChange={(e) => this.setState({ username: e.target.value })}
          type="text"
        />
        <button onClick={this.addUser}>Add user</button>
        <br />
        <br />
        <input
          value={userId}
          onChange={(e) => this.setState({ userId: e.target.value })}
          type="number"
        />
        <button onClick={this.getUser}>get user</button> <br/>
        <button onClick={this.deleteUser}>delete user</button> <br/>
        <button onClick={this.updateUser}>udpate user</button> <br/>
      </div>
    );
  }
}

export default App;
