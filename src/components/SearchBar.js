import filter from "../assets/img/filter.png";


export default function SearchBar({ setValue }) {

  function handleSearch(event) {
    setValue(event.target.value.toLowerCase());
  }

  return (
    <article>
      <button className="buttonfilter">
        <img src={filter} alt="filter" className="filter"/>
      </button>
      <input type="search" placeholder="Search" onChange={handleSearch} className="searchbar"/>
    </article>
  );
}
