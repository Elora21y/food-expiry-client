import React, { useState } from 'react';

const Search = ({setFoods , data}) => {
      const [searchText, setSearchText] = useState('')

     const handleChange = (e)=>{
    const value = e.target.value;
    setSearchText(value)
    handleSubmit(value)
  }
  const handleSubmit = ( text) => {
        if(text === '') return setFoods(data)
        const searchFood = data.filter(food => food.title.toLowerCase().includes(text.toLowerCase()) || food.foodType.toLowerCase().includes(text.toLowerCase()))
        
        setFoods(searchFood)
      };

    return (
        <div>
            <form onSubmit={(e)=> e.preventDefault()} className="flex  justify-center items-center gap-4">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" value={searchText} placeholder="Search Food by title, category" onChange={ handleChange }/>
          </label>

          <button label='Search' type='Submit'></button>
        </form>
        </div>
    );
};

export default Search;