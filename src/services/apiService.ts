import { Customer } from '../models/Customer';

/**
 * Fetches all customers (no limit) from the dummyjson API and returns the parsed Customer Array
 */
export const fetchAllCustomers = async (): Promise<Customer[]> => {
	try {
		// Fetch data from dummyjson API
		const response = await fetch('https://dummyjson.com/users?limit=0');
		if (!response.ok)
			throw new Error('Failed to load data from dummyjson.com');
		const data = await response.json();

		// Parse response data to Customer model
		return data.users.map(
			(user: any): Customer => ({
				id: user.id,
				name: `${user.firstName} ${user.lastName}`,
				city: user.address.city,
				birthday: new Date(user.birthDate),
			})
		) as Customer[];
	} catch (error) {
		console.error('Error on Api Call fetchCustomers', error);
		return [];
	}
};
