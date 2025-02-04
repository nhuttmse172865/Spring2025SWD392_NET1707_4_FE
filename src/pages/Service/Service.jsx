import React, { useState } from 'react';
import './Service.scss' // Make sure to import the CSS file

const services = [
    { id: 1, name: 'Facial', type: 'Oily', description: 'Deep cleansing facial for oily skin.' },
    { id: 2, name: 'Moisturizing', type: 'Dry', description: 'Hydrating treatment for dry skin.' },
    { id: 3, name: 'Anti-Aging', type: 'Combination', description: 'Anti-aging treatment for combination skin.' },
    // Add more services as needed
];

const Service = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('name');
    const [filterType, setFilterType] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortType(event.target.value);
    };

    const handleFilter = (event) => {
        setFilterType(event.target.value);
    };

    const filteredServices = services
        .filter(service => 
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType ? service.type === filterType : true)
        )
        .sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortType === 'type') {
                return a.type.localeCompare(b.type);
            }
            return 0;
        });

    return (
        <div className="services-container">
            <h1 className="services-header">Skincare Services</h1>
            <div className="services-controls">
                <input 
                    type="text" 
                    placeholder="Search services..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                />
                <select value={sortType} onChange={handleSort}>
                    <option value="name">Sort by Name</option>
                    <option value="type">Sort by Type</option>
                </select>
                <select value={filterType} onChange={handleFilter}>
                    <option value="">All Skin Types</option>
                    <option value="Oily">Oily</option>
                    <option value="Dry">Dry</option>
                    <option value="Combination">Combination</option>
                </select>
            </div>
            <ul className="services-list">
                {filteredServices.map(service => (
                    <li key={service.id} className="service-item">
                        <h2>{service.name}</h2>
                        <p className="service-type">Type: {service.type}</p>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Service;