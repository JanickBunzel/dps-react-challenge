type FilterProps = {
	setNameFilter: (name: string) => void;
	setCityFilter: (city: string) => void;
	setHighlightOldest: (highlightOldest: boolean) => void;
	cities: string[];
};

const CustomerFilters = ({
	setNameFilter,
	setCityFilter,
	setHighlightOldest,
	cities,
}: FilterProps) => {
	const uniqueCities = Array.from(new Set(cities));

	return (
		<div>
			{/* Textfield: Name filter input */}
			<input
				type="text"
				placeholder="Search by name..."
				onChange={(e) => setNameFilter(e.target.value)}
			/>

			{/* Dropdown: City filter input */}
			<select onChange={(e) => setCityFilter(e.target.value)}>
				<option value="">Select City</option>
				{uniqueCities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>

			{/* Checkbox: Highlight oldest of cities */}
			<label>
				Highlight oldest user per city
				<input
					type="checkbox"
					onChange={(e) => setHighlightOldest(e.target.checked)}
				/>
			</label>
		</div>
	);
};

export default CustomerFilters;
