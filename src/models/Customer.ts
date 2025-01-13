import { parse } from 'date-fns';
import { z } from 'zod';

/**
 * Customer Object Schema expected by dummyjson and transformed to the Customer model used in this application
 */
export const customerSchema = z
	.object({
		id: z.number(),
		firstName: z.string(),
		lastName: z.string(),
		address: z.object({ city: z.string() }),
		birthDate: z.string(),
	})
	.transform((c) => ({
		id: c.id,
		name: `${c.firstName} ${c.lastName}`,
		city: c.address.city,
		birthday: parse(c.birthDate, 'yyyy-M-d', new Date()),
	}));

/**
 * Customer Model based on subset of dummyjson user properties
 */
export type Customer = z.infer<typeof customerSchema>;
