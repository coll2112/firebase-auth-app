import React from 'react'
import { Navbar as BootstrapNavbar, NavbarBrand, NavbarText } from 'reactstrap'

export const Navbar = ({ user }) => {
	let greetingMsg
	if (user) {
		greetingMsg = <NavbarText>Welcome, {user.name[0]}</NavbarText>
	}

	return (
		<>
			<BootstrapNavbar color='primary'>
				<NavbarBrand>Firebase Auth</NavbarBrand>
				{greetingMsg}
			</BootstrapNavbar>
		</>
	)
}
