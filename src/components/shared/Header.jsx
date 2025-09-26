import React, { useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import { MenuButton, Menu, MenuItems, MenuItem, Popover, Transition } from '@headlessui/react';
import {
	HiOutlineSearch,
	HiOutlineBell,
	HiOutlineChatAlt,
} from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { logoutUser, fetchUserDetails } from '../admin/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user?.data);
	const title = useSelector((state)=>state.heading.title)

	const handleLogout = () => {
		dispatch(logoutUser());
		Swal.fire({
			icon: 'success',
			title: 'Logout Successfully',
			text: 'You have been logged out.',
			showConfirmButton: false,
			timer: 2500, // Duration for the alert
		});

		// Navigate to the login page after the alert closes
		setTimeout(() => {
			navigate('/login');
		}, 2500);
	};

	useEffect(() => {
		dispatch(fetchUserDetails());
	}, [dispatch]);

	const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : '';

	return (
		<div className="h-16 px-4 flex items-center justify-between border-b bg-gray-100 text-black border-gray-200">
			<div className="relative">
				<h1 className="text-2xl font-bold">{title}</h1>
			</div>
			<div className="flex items-center gap-4">
				{/* <Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-200',
									'inline-flex items-center p-2 rounded-full focus:outline-none'
								)}
							>
								<HiOutlineChatAlt fontSize={24} className="text-gray-700" />
							</Popover.Button>
							
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
									<div className="bg-white rounded-sm shadow-md px-4 py-2">
										<strong className="text-gray-700">Messages</strong>
										<div className="mt-2 text-sm text-gray-600">This is messages panel.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover> */}

				{/* <Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-200',
									'inline-flex items-center p-2 rounded-full focus:outline-none'
								)}
							>
								<HiOutlineBell fontSize={24} className="text-gray-700" />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
									<div className="bg-white rounded-sm shadow-md px-4 py-2">
										<strong className="text-gray-700">Notifications</strong>
										<div className="mt-2 text-sm text-gray-600">This is notification panel.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover> */}

				{/* User Menu */}
				<Menu as="div" className="relative">
					<MenuButton className="ml-2 p-1.5 flex items-center justify-center w-10 h-10 rounded-full focus:outline-none">
						<div className="flex items-center justify-center w-full h-full rounded-full bg-gray-400 text-black">
							<span className="font-bold">{firstLetter}</span>
						</div>
					</MenuButton>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-sm shadow-md">
							{/* <Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('/profile')}
										className={classNames(
											active && 'bg-gray-100',
											'px-4 py-2 cursor-pointer'
										)}
									>
										Your Profile
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate(`/profile-update/${user?.id}`)}
										className={classNames(
											active && 'bg-gray-100',
											'px-4 py-2 cursor-pointer'
										)}
									>
										Update Profile
									</div>
								)}
							</Menu.Item> */}
							<MenuItem>
								{({ active }) => (
									<div
										onClick={handleLogout}
										className={classNames(
											active && 'bg-gray-100',
											'px-4 py-2 cursor-pointer text-red-500'
										)}
									>
										Sign Out
									</div>
								)}
							</MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
			</div>
		</div>
	);
}