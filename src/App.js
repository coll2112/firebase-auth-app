import React from 'react'
import firebase, { auth, provider } from './firebase'
import { Alert, Container, Button, Row, Col } from 'reactstrap'
import { Navbar } from './components/navbar'
import { UserProfile } from './components/user-profile'

import './App.css'

function App() {
	const [user, setUser] = React.useState(null)
	const [visible, setVisible] = React.useState(false)
	const [alertText, setAlertText] = React.useState('')

	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser({
					name: user.displayName.split(' '),
					photo: user.photoURL,
					id: user.uid,
				})
			}
		})
	}, [])

	const loginUser = () => {
		auth.signInWithPopup(provider).then((result) => {
			const user = result.user
			setAlertText('Successful Sign In!')
			setUser({
				name: user.displayName.split(' '),
				photo: user.photoURL,
				id: user.uid,
			})
			setVisible(true)
			setTimeout(() => {
				setVisible(false)
			}, 3000)
		})
	}

	const logoutUser = () => {
		auth.signOut().then(() => {
			setAlertText('You have been successfully logged out.')
			setUser(null)
			setVisible(true)
			setTimeout(() => {
				setVisible(false)
			}, 3000)
		})
	}

	let signInButton = (
		<Button block color='success' onClick={loginUser}>
			Sign In
		</Button>
	)
	let userImg
	if (user) {
		signInButton = (
			<Button block color='success' onClick={logoutUser}>
				Sign Out
			</Button>
		)
		userImg = (
			<img style={{ borderRadius: '50%' }} width='200px' src={user.photo} />
		)
	}

	console.log(user)

	return (
		<>
			<Navbar user={user} />
			<Alert isOpen={visible}>{alertText}</Alert>
			<Container>
				{user ? <UserProfile user={user} /> : undefined}
				<Row style={{ paddingTop: '2rem' }}>
					<Col md={{ size: 4, offset: 4 }}>{signInButton}</Col>
				</Row>
			</Container>
		</>
	)
}

export default App
