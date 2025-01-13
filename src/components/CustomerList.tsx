import { Customer } from '../models/Customer';

type CustomerListProps = {
	customers: Customer[];
};

const CustomerList = ({ customers }: CustomerListProps) => {
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
					<tr key={customer.id}>
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
