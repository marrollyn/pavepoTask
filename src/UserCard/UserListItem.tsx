import styles from './UserListItem.module.scss';
import { TUser } from '../types';
import React from 'react';

function UserListItem(user: TUser) {
	return (
		<li key={user.id} className={styles.card}>
			<h3>{user.name}</h3>
			<p>Никнейм: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>Город: {user.address.city}</p>
			<p>Компания: {user.company.name}</p>
		</li>
	);
}

export default React.memo(UserListItem);
