import dpsLogo from './assets/DPS.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchAllCustomers } from './services/apiService';
import { Customer } from './models/Customer';
import CustomerFilters from './components/CustomerFilters';
import CustomerList from './components/CustomerList';

function App() {
	// Customer Arrays (complete and filtered)
	const [customers, setCustomers] = useState<Customer[]>([]);
	let filteredCustomers = [...customers];

	// Filter parameters
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

	// Load all customers on mount
	useEffect(() => {
		fetchAllCustomers().then((data) => setCustomers(data));
	}, []);

	// Filter customers for inputed name
	if (nameFilter) {
		filteredCustomers = filteredCustomers.filter((u) =>
			u.name.toLowerCase().includes(nameFilter.toLowerCase())
		);
	}

	// Filter customers for selected city
	if (cityFilter) {
		filteredCustomers = filteredCustomers.filter(
			(u) => u.city === cityFilter
		);
	}

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
					cities={customers.map((u) => u.city)}
				/>
				<CustomerList
					customers={filteredCustomers}
					highlightOldest={highlightOldest}
				/>
			</div>
		</>
	);
}

export default App;
