import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants';
import { logoutUser } from '../admin/slice/authSlice';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import './SideBar.css';
import logo from '../../assets/logo.svg';

const linkClass =
	'flex items-center gap-2 font-medium px-3 py-2 hover:bg-gray-300 hover:no-underline active:bg-gray-200 rounded-sm text-base';

export default function Sidebar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap();
    
    await Swal.fire({
      icon: 'success',
      title: 'Logout Successfully',
      text: 'You have been logged out.',
      showConfirmButton: false,
      timer: 2500,
    });
    
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    Swal.fire({
      icon: 'error',
      title: 'Logout Failed',
      text: 'There was a problem logging out.',
    });
  }
};

	return (
		<div className="bg-gray-200 text-black w-60 p-3 flex flex-col h-screen">
			{/* Logo Section */}
			<div className="items-center flex-col flex w-full">
				<img
					src={logo}
					alt="Boston Logo"
					className={`bg-transparent h-14`}
				/>
			</div>

			{/* Sidebar Links */}
			<div className="py-8 flex-1 flex flex-col gap-0.5 overflow-y-auto hide-scrollbar">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>

			{/* Bottom Links and Logout */}
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-400">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div
					onClick={handleLogout}
					className={classNames(linkClass, 'cursor-pointer text-red-500')}
				>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	);
}

function SidebarLink({ link }) {
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLinkClick = () => {
		if (!link.subLinks) {
			navigate(link.path);
		} else {
			setIsOpen((prev) => !prev);
		}
	};

	return (
		<div>
			{/* Parent Link */}
			<div
				onClick={handleLinkClick}
				className={classNames(
					pathname === link.path || (link.subLinks && isOpen)
						? 'bg-gray-300 text-black'
						: 'text-neutral-500',
					linkClass,
					{ 'cursor-pointer': link.subLinks }
				)}
			>
				<span className="text-xl">{link.icon}</span>
				{link.label}
			</div>

			{/* Nested Sublinks */}
			{isOpen && link.subLinks && (
				<div className="pl-6">
					{link.subLinks.map((subLink) =>
						subLink.subLinks ? (
							<SidebarLink key={subLink.key} link={subLink} />
						) : (
							<Link
								key={subLink.key}
								to={subLink.path}
								className={classNames(
									pathname === subLink.path
										? 'bg-gray-300 text-black'
										: 'text-neutral-700',
									linkClass
								)}
							>
								{subLink.label}
							</Link>
						)
					)}
				</div>
			)}
		</div>
	);
}