export default function SearchBar({ setValue }) {

  function handleSearch(event) {
    setValue(event.target.value.toLowerCase());
  }

  return (
    <article>
      <input type="search" placeholder="Search" onChange={handleSearch} />
    </article>
  );
}
