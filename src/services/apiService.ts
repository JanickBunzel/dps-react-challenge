import { Customer, customerSchema } from '../models/Customer';
import { z } from 'zod';

// Schema for the expected dummyjson response
const responseSchema = z.object({
	users: customerSchema.array(),
});

/**
 * Fetches all customers (no limit) from the dummyjson API and returns the parsed Customer Array
 */
export const fetchAllCustomers = async (): Promise<Customer[]> => {
	try {
		// Fetch data from dummyjson API
		const response = await fetch('https://dummyjson.com/users?limit=0');
		if (!response.ok)
			throw new Error('Failed to load data from dummyjson.com');
		const data = (await response.json()) as unknown;

		// Parse JSON Data to Customer type safely
		return responseSchema.parse(data).users;
	} catch (error) {
		// On Error, return empty Array of Customers
		console.error('Error on Api Call fetchCustomers', error);
		return [];
	}
};
