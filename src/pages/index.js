import React from 'react'
import { Link } from 'react-router-dom'
import { NavbarStyle } from './styles'
const Navbar = () => {
  return (
    <NavbarStyle>
      <Link to="/">Today Sales Dashboard</Link>
      <Link to="/sales-comparison-dashboard">Sales Comparison Dashboard</Link>
      
    </NavbarStyle>
  )
}

export default Navbar