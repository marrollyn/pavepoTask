import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser, getCurrentUser } from '../slice/currentUserSlice';
import { useNavigate } from 'react-router-dom';

function CurrentUser() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleBack() {
		navigate(-1);
		dispatch(clearCurrentUser());
	}

	const user = useSelector(getCurrentUser);

	const localCurrentUser = localStorage.getItem('currentUser');
	const parsedLocalCurrentUser = localCurrentUser
		? JSON.parse(localCurrentUser)
		: null;

	const selectedUser = user || parsedLocalCurrentUser;

	const headerText = user
		? 'Просмотр выбранного пользователя:'
		: parsedLocalCurrentUser
			? 'Просмотр последнего выбранного пользователя:'
			: '';

	return (
		<>
			{selectedUser ? (
				<div>
					<h3>
						{headerText} {selectedUser.name}
					</h3>
					<p>Никнейм: {selectedUser.username}</p>
					<p>Email: {selectedUser.email}</p>
					<p>
						Адрес: {selectedUser.address.zipcode},{' '}
						{selectedUser.address.city},{' '}
						{selectedUser.address.street},{' '}
						{selectedUser.address.suite}
					</p>
					<p>Тел.: {selectedUser.phone}</p>
					<p>Сайт: {selectedUser.website}</p>
					<h4>Компания</h4>
					<p>Название: {selectedUser.company.name}</p>
					<p>Направление: {selectedUser.company.bs}</p>
					<p>Слоган: {selectedUser.company.catchPhrase}</p>
				</div>
			) : (
				<div>Пользователь не был выбран</div>
			)}
			<button onClick={handleBack}>Назад</button>
		</>
	);
}

export default React.memo(CurrentUser);
