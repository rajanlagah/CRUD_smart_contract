import React from 'react'
import Web3 from 'web3'
import { getWeb3 } from './utils';

import logo from './logo.svg';
import './App.css';
import CRUD from './contracts/CRUD.json'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      _web3:null,
      contract:null,
      accounts:[],
      userId:1,
    }
  }

  componentDidMount(){
    try{
      this.getSetWeb3()
    }catch(e){
      console.log("ERROR IN INIT",e)
    }
  }

  getSetWeb3 = async () => {
    try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CRUD.networks[networkId];
        const contract = new web3.eth.Contract(
          CRUD.abi,
          deployedNetwork && deployedNetwork.address,
        );

        this.setState({ web3, accounts, contract }, this.addUser);

    }catch(e){
      console.log("ERROR IN INIT 0",e)
    }
  }

  addUser = async () =>{
    const { contract, accounts } = this.state
    // debugger
    try{
        contract.methods.sayHi()
          .send({
              from: accounts[0],
              gas: 3000000,
              gasPrice: Web3.utils.toWei('10', 'gwei')

          })
            .then( res => {
              console.log("res",res)
            })
            .catch(e => console.log(e.message))
    }catch(e){
      console.log("ADD USER",e)

    }
  }
  getUser = async () =>{
    const { contract, accounts , userId } = this.state
    try{
      contract.methods
        .getUser(parseInt(userId))
        .call()
        .then( res => {
          console.log("res",res)
          console.log("res",res[0])
        })
    .catch(e => console.log(e))
    }catch(e){
      console.log("GET USER",e)
    }
  }

  render(){
    const { userId } = this.state
    return (
      <div>
        CRUD
        <button onClick={this.addUser}>Add user</button>
        <input value={userId} onChange = {(e)=>this.setState({userId:e.target.value})} type='number'/>
        <button onClick={this.getUser}>get user</button>
      </div>
    );
  }
}

export default App;
