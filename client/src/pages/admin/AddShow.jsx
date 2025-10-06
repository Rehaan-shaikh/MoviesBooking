import React, { useState } from 'react';
import { dummyShowsData } from '../../assets/assets.js';

const AddShow = () => {
    const [formData, setFormData] = useState({
        movie: '',
        showDateTime: '',
        showPrice: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically dispatch an action to add the show
        console.log('Form Data Submitted:', formData);
        alert('Show added successfully (check console)!');
    }

  return (
    <div className="text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add a New Show</h1>
      <div className="bg-[#1A1A1A] p-8 rounded-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="movie" className="block text-sm font-medium text-gray-300 mb-2">Select Movie</label>
                <select 
                    id="movie" 
                    name="movie"
                    value={formData.movie}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#2D2D2D] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="" disabled>Choose a movie...</option>
                    {dummyShowsData.map(movie => (
                        <option key={movie._id} value={movie._id}>{movie.title}</option>
                    ))}
                </select>
            </div>

            <div>
                 <label htmlFor="showDateTime" className="block text-sm font-medium text-gray-300 mb-2">Show Date and Time</label>
                 <input 
                    type="datetime-local"
                    id="showDateTime"
                    name="showDateTime"
                    value={formData.showDateTime}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#2D2D2D] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                 />
            </div>
            
            <div>
                 <label htmlFor="showPrice" className="block text-sm font-medium text-gray-300 mb-2">Ticket Price</label>
                 <input 
                    type="number"
                    id="showPrice"
                    name="showPrice"
                    placeholder="Enter price in $"
                    value={formData.showPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full bg-[#2D2D2D] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                 />
            </div>

            <div className="pt-4">
                <button type="submit" className="w-full bg-primary hover:bg-primary-dull text-white font-bold py-3 px-4 rounded-lg transition">
                    Add Show
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddShow;

