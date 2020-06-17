import React from 'react'
import firebase, { auth, provider } from './firebase'

import './App.css'

function App() {
	const [user, setUser] = React.useState(null)

	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser({
					name: user.displayName,
					photo: user.photoURL,
					id: user.uid,
				})
			}
		})
	}, [])

	const loginUser = () => {
		auth.signInWithPopup(provider).then((result) => {
			const user = result.user
			console.log(user)
			setUser({
				name: user.displayName,
				photoURL: user.photoURL,
				id: user.uid,
			})
		})
	}

	const logoutUser = () => {
		auth.signOut().then(() => {
			setUser(null)
		})
	}

	let signInButton = <button onClick={loginUser}>Sign In</button>
	let userImg
	if (user) {
		signInButton = <button onClick={logoutUser}>Sign Out</button>
		userImg = (
			<img
				style={{ borderRadius: '50%', border: '1px solid blue' }}
				width='200px'
				src={user.photo}
			/>
		)
	}

	console.log(user)

	return (
		<>
			{user ? <h3>Welcome {user.name}</h3> : <h3>This is a firebase app</h3>}
			{userImg}
			{signInButton}
		</>
	)
}

export default App
