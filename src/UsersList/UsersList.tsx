import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import getData from '../api';
import { TUsers, TUser } from '../types';
import UserListItem from '../UserCard/UserListItem';
import styles from './UsersList.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setData } from '../slice/userFiltersSlice';
import { Link } from 'react-router-dom';
import { setCurrentUser } from '../slice/currentUserSlice';
import UserFilters from './UserFiltersComponent/UserFilters';

function UsersList() {
	const dispatch = useDispatch<AppDispatch>();

	const [searchItem, setSearchItem] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedCompany, setSelectedCompany] = useState('');

	const { data, error, isLoading } = useQuery<TUsers, Error>({
		queryKey: ['users'],
		queryFn: getData,
	});

	const uniqueCities = useMemo(
		() =>
			data
				? Array.from(new Set(data.map((user) => user.address.city)))
				: [],
		[data]
	);

	const uniqueCompanies = useMemo(
		() =>
			data
				? Array.from(new Set(data.map((user) => user.company.name)))
				: [],
		[data]
	);

	useEffect(() => {
		if (data) {
			dispatch(
				setData({
					cityList: uniqueCities,
					companyList: uniqueCompanies,
				})
			);
		}
	}, [data, dispatch, uniqueCities, uniqueCompanies]);

	function handleClick(user: TUser) {
		console.log('click');
		dispatch(setCurrentUser(user));
		localStorage.setItem('currentUser', JSON.stringify(user));
	}

	const filteredUsers = useMemo(() => {
		if (!data) return [];
		return data.filter((user) => {
			const searchMatch =
				user.name.toLowerCase().includes(searchItem.toLowerCase()) ||
				user.email.toLowerCase().includes(searchItem.toLowerCase());
			const cityMatch = selectedCity
				? user.address.city === selectedCity
				: true;
			const companyMatch = selectedCompany
				? user.company.name === selectedCompany
				: true;
			return searchMatch && cityMatch && companyMatch;
		});
	}, [data, searchItem, selectedCity, selectedCompany]);

	if (error) return <div>Ошибка: {(error as Error).message}</div>;

	return (
		<>
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<>
					<UserFilters
						searchItem={searchItem}
						selectedCity={selectedCity}
						selectedCompany={selectedCompany}
						onSearchChange={setSearchItem}
						onCityChange={setSelectedCity}
						onCompanyChange={setSelectedCompany}
					/>
					<ul className={styles.list}>
						{filteredUsers.map((user) => (
							<Link
								key={user.id}
								to={`/currentUser/`}
								onClick={() => handleClick(user)}
							>
								<UserListItem {...user} />
							</Link>
						))}
					</ul>
				</>
			)}
		</>
	);
}

export default React.memo(UsersList);
