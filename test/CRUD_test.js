const CRUD = artifacts.require('CRUD')

contract('Test CRUD', ()=>{
	let crud = null;

	before(async ()=>{
		crud = await CRUD.deployed()
	})

	it('Check if User added', async ()=>{
		await crud.addUser('User_2')
		const addedUserName = await crud.getUser(1);
		assert( addedUserName[0].toNumber() == 1)
		assert( addedUserName[1] == 'User_2')
	})

	it('Check get user', async ()=>{
		const addedUserName = await crud.getUser(1);
		assert( addedUserName[0].toNumber() == 1)
		assert( addedUserName[1] == 'User_2')	
	})

	it('Check get user when no user', async ()=>{
		try{
			 await crud.getUser(2);
		}catch(e){
			assert(e.message.includes('User does not exist'))
			return
		}
		assert(false)
	})

	it('Check update user', async ()=>{
		await crud.updateUser(1,"User_updated")
		const updatedUser = await crud.getUser(1)
		assert(updatedUser[1] == 'User_updated')
	})

	it('Check update user when user doesnot exist', async ()=>{
		try{
				await crud.updateUser(2,"User_updated")
		}catch(e){
			assert(e.message.includes('User does not exist'))
			return
		}
		assert(false)
	})

	it('Check delete user', async ()=>{
		await crud.deleteUser(1);
		try{
			const userData = await crud.getUser(1)
		}catch(e){
			assert(e.message.includes('User does not exist'))
			return
		}
			assert(false)
	})



	it('Check delete user when user doesnot exist', async ()=>{
		try{
				await crud.deleteUser(10)
		}catch(e){
			assert(e.message.includes('User does not exist'))
			return
		}
		assert(false)
	})
})