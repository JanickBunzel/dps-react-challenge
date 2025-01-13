import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchAllCustomers } from './services/apiService';
import { Customer } from './models/Customer';
import CustomerFilters from './components/CustomerFilters';
import CustomerList from './components/CustomerList';

function App() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false); // TODO: Implement highlightOldest functionality

	useEffect(() => {
		fetchAllCustomers().then((data) => setCustomers(data));
	}, []);

	useEffect(() => {
		let filtered = [...customers];

		// Filter for name
		if (nameFilter) {
			filtered = filtered.filter((u) =>
				u.name.toLowerCase().includes(nameFilter.toLowerCase())
			);
		}

		// Filter for city
		if (cityFilter) {
			filtered = filtered.filter((u) => u.city === cityFilter);
		}

		setFilteredCustomers(filtered);
	}, [nameFilter, cityFilter, customers]);

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<h1>DPS CRM</h1>
				<CustomerFilters
					setNameFilter={setNameFilter}
					setCityFilter={setCityFilter}
					setHighlightOldest={setHighlightOldest}
					cities={[...new Set(customers.map((u) => u.city))]}
				/>
				<CustomerList customers={filteredCustomers} />
			</div>
		</>
	);
}

export default App;
