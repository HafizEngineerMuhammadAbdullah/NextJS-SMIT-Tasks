import React from 'react'
import Navbar from './Navbar'
// Header and Navbar — navigation and branding
// Display the application identity and community badge. They don't need access to tree state unless you later add navigation features that use it.
const Header = () => {
    return (
        <header className="border-b border-emerald-100 bg-white">
            {/* Navbar */}
            <Navbar />
        </header>
    )
}

export default Header
