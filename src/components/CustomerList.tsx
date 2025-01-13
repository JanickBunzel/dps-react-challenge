import { Customer } from '../models/Customer';

type CustomerListProps = {
	customers: Customer[];
	highlightOldest: boolean;
};

const CustomerList = ({ customers, highlightOldest }: CustomerListProps) => {
	const oldestCustomerIds = new Set<number>();

	// Determine the oldest customers of each city
	if (highlightOldest) {
		const oldestCustomersByCity = new Map<string, Customer[]>();

		customers.forEach((customer) => {
			const currentOldestCustomers =
				oldestCustomersByCity.get(customer.city) ?? [];
			const currentOldestBirthday = currentOldestCustomers[0]?.birthday;

			if (
				!currentOldestCustomers.length ||
				customer.birthday < currentOldestBirthday
			) {
				// Found the oldest customer in their city so far
				oldestCustomersByCity.set(customer.city, [customer]);
			} else if (
				customer.birthday.getTime() === currentOldestBirthday.getTime()
			) {
				// Current oldest customer has the same birthday as this one, simple add them
				currentOldestCustomers.push(customer);
			}
		});

		// Convert map to set of customer ids
		[...oldestCustomersByCity.values()]
			.flat()
			.forEach((c) => oldestCustomerIds.add(c.id));
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{customers.map((customer) => (
					<tr
						key={customer.id}
						className={
							highlightOldest &&
							oldestCustomerIds.has(customer.id)
								? 'highlightOldest'
								: ''
						}
					>
						<td>{customer.name}</td>
						<td>{customer.city}</td>
						<td>{customer.birthday.toLocaleDateString('de-DE')}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CustomerList;
