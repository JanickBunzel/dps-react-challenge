import './CustomerFilters.css';

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
		<div className="customerfilter">
			{/* Textfield: Name filter input */}
			<input
				type="text"
				placeholder="Search by name..."
				onChange={(e) => setNameFilter(e.target.value)}
			/>

			{/* Dropdown: City filter input */}
			<select
				onChange={(e) => {
					setCityFilter(e.target.value);
					e.target.className =
						e.target.value === '' ? '' : 'city-selected';
				}}
			>
				<option value="">Select City</option>
				{uniqueCities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>

			{/* Checkbox: Highlight oldest customers of cities */}
			<label htmlFor="highlightOldest" className="highlightOldestLabel">
				Highlight oldest <br />
				user per city
				<input
					id="highlightOldest"
					type="checkbox"
					onChange={(e) => {
						setHighlightOldest(e.target.checked);
						e.target.parentElement!.className = e.target.checked
							? 'highlightOldestChecked'
							: '';
					}}
				/>
			</label>
		</div>
	);
};

export default CustomerFilters;
