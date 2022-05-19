const Web3 = window.Web3
 
let crud

const ABI = [
    {
      "inputs": [],
      "name": "maxId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAll",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "internalType": "struct CRUD.User[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addUser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_newName",
          "type": "string"
        }
      ],
      "name": "updateUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const ADDRESS = "0xB60A9A9f2dCb050da8Cc10Cd4aa354d06ca53eeb"
let accounts = []

const addUserBtn = document.getElementById('add-user-btn')
const getAllUserBtn = document.getElementById('getAll-user-btn')
const getUserBtn = document.getElementById('get-user-by-index-btn')
const usernameInput = document.getElementById('username-input')
const userIndex = document.getElementById('user-index')

const initWeb3 = () => {
  console.log(window)
	return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new window.Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new window.Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.Web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }

		resolve(new Web3('http://127.0.0.1:7545'))
	})
}

const initContract = () => {
	return new web3.eth.Contract(
			ABI,
			ADDRESS
		)
}
const getSetAccounts = () => {
  web3.eth.getAccounts()
    .then( _accounts => {
      accounts = _accounts
      initApp()
    })
}

const initApp = () => {
	console.log("APP INITED")
	console.log(crud)
}

getAllUserBtn.addEventListener('click',(e)=>{
	e.preventDefault()
	crud.methods.getAll()
    .send({from: accounts[0]})
		.then( res => console.log("res",res))
		.catch(e => console.log("error",e.message))
})

addUserBtn.addEventListener('click',async (e)=>{
  e.preventDefault()
  
  const inputUserName = usernameInput.value
  console.log(inputUserName)
  console.log(accounts)
  console.log(await web3.eth.getBalance(accounts[0]))
  crud.methods.addUser(inputUserName)
  .send({from: accounts[0]})
    .then( res => {
      console.log("res",res)
    })
    .catch(e => console.log(e.message))
})

getUserBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  
  const index = userIndex.value
  console.log(index)

  crud.methods.getUser(index).call()
    .then( res => {
      console.log("res",res[0])
    })
    .catch(e => console.log(e))
})


document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      console.log("HERE")
      web3 = _web3;
      crud = initContract();
      getSetAccounts(); 
    })
    .catch(e => console.log(e.message));
});
