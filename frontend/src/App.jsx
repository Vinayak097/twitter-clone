import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage '
import {  Routes , Route } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import './App.css'
import RightPanel from './components/common/Right'
import NotificationPage from './pages/notifications/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'

function App() {
	return (
		<div className='flex max-w-6xl mx-auto'>
			<Sidebar></Sidebar>
			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/notifications' element={<NotificationPage />} />
				<Route path='/profile/:username' element={<ProfilePage />} />
				
			</Routes>	
			<RightPanel></RightPanel>
		</div>
	);
}

export default App
