import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import { useSelector } from 'react-redux';

export default function Layout() {
	const { id } = useParams();

	return (
		<div className="h-screen w-screen overflow-hidden flex flex-row bg-gray-100 text-black">
			{/* Sidebar */}
			<SideBar />
			
			{/* Main Content Area */}
			<div className="flex flex-col flex-1">
				{/* Header */}
				<Header id={id || ''} />
				
				{/* Page Content */}
				<div className="flex-1 p-4 overflow-auto bg-white text-gray-800">
					<Outlet />
				</div>
			</div>
		</div>
	);
}