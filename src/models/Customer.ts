/**
 * Customer Model based on subset of dummyjson user properties
 */
export type Customer = {
	id: number;
	name: string; // Full name (firstName + ' ' + lastName)
	city: string; // City living in (address.city)
	birthday: Date;
};
