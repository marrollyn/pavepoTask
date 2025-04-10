import { TUsers } from './types';

export default async function getData(): Promise<TUsers> {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	if (!response.ok) {
		throw new Error('Ошибка запроса fetch');
	}
	return response.json();
}
