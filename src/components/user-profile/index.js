import React from 'react'
import { Container as BootstrapContainer, Col, Row, Button } from 'reactstrap'
import styled from 'styled-components'

const Container = styled(BootstrapContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 35%;
	height: 450px;
	text-align: center;
	box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	padding: 3rem;
`

const ProfilePic = styled.img`
	width: 150px;
	border-radius: 50%;
`

export const UserProfile = ({ user, logout }) => {
	return (
		<Container>
			<Row>
				<Col>
					<ProfilePic width='200px' src={user.photo} />
				</Col>
			</Row>
			<Row>
				<Col>
					<h4>{user.name.join(' ')}</h4>
				</Col>
			</Row>
			<Button block onClick={logout} color='danger'>
				Logout
			</Button>
		</Container>
	)
}
