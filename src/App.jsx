import { useState } from "react"
function App() {

  const properties = [
    { id: 1, name: 'Cozy Cottage', price: 120000, type: 'House', bedrooms: 2 },
    { id: 2, name: 'Luxury Villa', price: 450000, type: 'House', bedrooms: 5 },
    { id: 3, name: 'Modern Apartment', price: 300000, type: 'Apartment', bedrooms: 3 },
    { id: 4, name: 'Suburban Home', price: 200000, type: 'House', bedrooms: 3 },
    { id: 5, name: 'City Condo', price: 220000, type: 'Apartment', bedrooms: 2 },
  ];

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({ type: 'All', bedrooms: 'All', sortBy: 'None' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let newProperties = properties;
    
    if (filters.type !== 'All') {
      newProperties = newProperties.filter(property => property.type === filters.type);
    }

    if (filters.bedrooms !== 'All') {
      newProperties = newProperties.filter(property => property.bedrooms === parseInt(filters.bedrooms));
    }

    if (filters.sortBy === 'Price: Low to High') {
      newProperties.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'Price: High to Low') {
      newProperties.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(newProperties);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-white">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-2">Property Type</label>
          <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="All">All</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bedrooms</label>
          <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Sort By</label>
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="None">None</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
        <button onClick={applyFilters} className="w-full p-2 bg-blue-500 text-white rounded">Apply Filters</button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Properties</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredProperties.map(property => (
            <div key={property.id} className="p-4 bg-white border border-gray-300 rounded">
              <h3 className="text-xl font-bold">{property.name}</h3>
              <p className="mt-2">Price: ${property.price.toLocaleString()}</p>
              <p>Type: {property.type}</p>
              <p>Bedrooms: {property.bedrooms}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
