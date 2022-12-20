import React from 'react'
import './Search.css'

const Search = () => {
    return (
        <div>
            <form onsubmit="event.preventDefault();" role="search">
                <label for="search">Search for stuff</label>
                <input id="search" type="search" placeholder="Search..." autofocus required />
                <button type="submit">Go</button>
            </form>
        </div>
        
    )
}

export default Search
