import { Customer, customerSchema } from '../models/Customer';
import { z } from 'zod';

// Schema for the expected dummyjson response
const responseSchema = z.object({
	users: customerSchema.array(),
});

/**
 * Fetches all customers (no limit) from the dummyjson API and returns the parsed Customer Array
 */
export const fetchAllCustomers = (): Promise<Customer[]> =>
	// Fetch data from dummyjson API
	fetch('https://dummyjson.com/users?limit=0')
	.then((response) => {
		if (!response.ok) throw new Error('Failed to load data from dummyjson.com');
		return response.json()
	})
	
	// Parse JSON Data to Customer type safely
	.then((data) => responseSchema.parse(data).users)
	
	// On Error, return empty Array of Customers
	.catch((error) => {
		console.error('Error on Api Call fetchCustomers', error);
		return [];
	});
