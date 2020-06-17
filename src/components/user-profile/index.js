import React from 'react'
import { Col, Row, Card, Cardtext, CardBody, CardTitle } from 'reactstrap'

export const UserProfile = ({ user }) => {
	return (
		<Row>
			<Col lg='12'>
				<img width='200px' src={user.photo} />
			</Col>
			<Col lg='12'>
				<h4>{user.name.join(' ')}</h4>
			</Col>
		</Row>
	)
}
