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
const ADDRESS = "0xf5d7752BB43d55033cD03EB14C617F4589500F4b"

const addUserBtn = document.getElementById('add-user-btn')

const initWeb3 = () => {

	return new Promise((res,rej) => {
		if(typeof window.ethereum !== "undefined"){
			const web3 = new Web3(window.ethereum)

			window.ethereum.enable()
				.then(()=>{
					res(new Web3(window.ethereum))
				})
				.catch( e => {
					rej(e)
				})
				return
		}
		if(typeof window.web3 !== 'undefined'){
			return res(
					new Web3(window.web3.currentProvider)
				)
		}

		res(new Web3('http://127.0.0.1:7545'))
	})
}

const initContract = () => {
	return new web3.eth.Contract(
			ABI,
			ADDRESS
		)
}

const initApp = () => {
	console.log("APP INITED")
	console.log(crud)
	crud.methods.addUser('RAJAN')
  .send({from: "e49b2b5be2dfcdda9cd345351a8321de509a2a7a92c151b09774ed8ef904929d"})
		.then( res => {
			console.log("res",res)
		})
		.catch(e => console.log(e))
	



}

addUserBtn.addEventListener('click',()=>{
	console.log("clicked")
	crud.methods.getAll().call()
		.then( res => console.log("res",res))
		.catch(e => console.log("error",e))
})

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      console.log("HERE")
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
