
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage '
import {  Routes , Route, Navigate } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import './App.css'
import RightPanel from './components/common/Right'
import NotificationPage from './pages/notifications/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'



function App() {

	const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		
	});
	return (
		<div className='flex max-w-6xl mx-auto'>
			{authUser? <Sidebar></Sidebar>:<></>	}
			
			<Routes>
				<Route path='/' element={authUser?<HomePage /> : Navigate('/login')} />
				<Route path='/signup' element={authUser ?<SignUpPage />:Navigate("/")} />
				<Route path='/login' element={authUser?<LoginPage />:Navigate("/")} />
				<Route path='/notifications' element={authUser?<NotificationPage />:Navigate("/login")} />
				<Route path='/profile/:username' element={authUser ?<ProfilePage />:Navigate("/login")} />
			</Routes>	
			{authUser? <RightPanel></RightPanel>:<></>}
			
			
			<Toaster></Toaster>
		</div>
	);
}

export default App
