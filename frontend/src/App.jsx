
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage '
import {  Routes , Route   } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import './App.css'
import RightPanel from './components/common/Right'
import NotificationPage from './pages/notifications/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'


function App() {
	const authUser=false;
	const isLoading=false;

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				loading....
			</div>
		);
	}
	return (
		<div className='flex max-w-6xl mx-auto'>
			{authUser? <Sidebar></Sidebar>:<></>	}
			
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/notifications' element={<NotificationPage />} />
				<Route path='/profile/:username' element={<ProfilePage />} />
			</Routes>	
			{authUser? <RightPanel></RightPanel>:<></>}
			
			
			<Toaster></Toaster>
		</div>
	);
}

export default App
{/* <Route path='/' element={authUser?<HomePage /> : Navigate('/login')} />
				<Route path='/signup' element={authUser ?<SignUpPage />:Navigate("/")} />
				<Route path='/login' element={authUser?<LoginPage />:Navigate("/")} />
				<Route path='/notifications' element={authUser?<NotificationPage />:Navigate("/login")} />
				<Route path='/profile/:username' element={authUser ?<ProfilePage />:Navigate("/login")} /> */}