import React from 'react'
import firebase, { auth, provider } from './firebase'
import {
	Alert as BootstrapAlert,
	Container as BootstrapContainer,
	Button,
	Row as BootstrapRow,
	Col,
} from 'reactstrap'
import styled from 'styled-components'
import { Navbar } from './components/navbar'
import { UserProfile } from './components/user-profile'

import './App.css'

const Container = styled(BootstrapContainer)`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Row = styled(BootstrapRow)`
	padding-top: 2rem;
`

const Alert = styled(BootstrapAlert)`
	padding: 2rem;
`

function App() {
	const [user, setUser] = React.useState()
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
			setUser()
			setVisible(true)
			setTimeout(() => {
				setVisible(false)
			}, 3000)
		})
	}

	let signInButton
	if (user === undefined) {
		signInButton = (
			<Button block color='success' onClick={loginUser}>
				Sign In
			</Button>
		)
	}

	console.log(user)

	return (
		<>
			<Navbar user={user} />
			<Alert isOpen={visible}>{alertText}</Alert>
			<Container>
				{user ? <UserProfile user={user} logout={logoutUser} /> : undefined}
				<Row>
					<Col md={{ size: 4, offset: 4 }}>{signInButton}</Col>
				</Row>
			</Container>
		</>
	)
}

export default App
