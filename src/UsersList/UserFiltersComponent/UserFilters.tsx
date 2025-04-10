import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './UserFilters.module.scss';

interface UserFiltersProps {
	searchItem: string;
	selectedCity: string;
	selectedCompany: string;
	onSearchChange: (value: string) => void;
	onCityChange: (value: string) => void;
	onCompanyChange: (value: string) => void;
}

const UserFilters: FC<UserFiltersProps> = ({
	searchItem,
	selectedCity,
	selectedCompany,
	onSearchChange,
	onCityChange,
	onCompanyChange,
}) => {
	const uniqueCities = useSelector(
		(state: RootState) => state.filterData.cityList
	);
	const uniqueCompanies = useSelector(
		(state: RootState) => state.filterData.companyList
	);

	return (
		<div className={styles.controls}>
			<div className={styles.controlGroup}>
				<label htmlFor="search">Поиск по имени или email:</label>
				<input
					id="search"
					type="text"
					placeholder="Введите запрос..."
					value={searchItem}
					onChange={(e) => onSearchChange(e.target.value)}
				/>
			</div>
			<div className={styles.controlGroup}>
				<label htmlFor="city-select">Фильтр по городу:</label>
				<select
					id="city-select"
					value={selectedCity}
					onChange={(e) => onCityChange(e.target.value)}
				>
					<option value="">Все города</option>
					{uniqueCities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			<div className={styles.controlGroup}>
				<label htmlFor="company-select">Фильтр по компании:</label>
				<select
					id="company-select"
					value={selectedCompany}
					onChange={(e) => onCompanyChange(e.target.value)}
				>
					<option value="">Все компании</option>
					{uniqueCompanies.map((company) => (
						<option key={company} value={company}>
							{company}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default React.memo(UserFilters);
