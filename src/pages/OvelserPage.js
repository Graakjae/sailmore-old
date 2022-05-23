import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

export default function OvelserPage({ showLoader }) {

    const [ovelser, setOvelser] = useState([]);
    const [filteredOvelser, setFilteredOvelser] = useState([]);

    useEffect(() => {
        async function getOvelser() {
        const url = "https://api.jsonbin.io/b/623af66406182767437ddcdf/3";
        const response = await fetch(url);
        const data = await response.json();
        setOvelser(data);
        setFilteredOvelser(data);
        showLoader(false);
        }
        getOvelser();
    }, [showLoader]);

    function filterOvelser(filters) {
        console.log(filters);
        if (filters.length) {
            const filteredData = ovelser.filter(ovelser => filters.includes(ovelser.muskel));
            setFilteredOvelser(filteredData);
        } else {
            setFilteredOvelser(ovelser);
        }
    }

    function handleSearch(val) {
        console.log(val);
        const filteredData = filteredOvelser.filter(ovelser => ovelser.name.toLowerCase().includes(val));
        setFilteredOvelser(filteredData);
    }

    return (
        <section className="OvelsePage">
            <h1>Øvelser</h1>
            <SearchBar setValue={handleSearch} />
            <Filter handleFilters={filterOvelser}/>
            <section>
                {filteredOvelser.map (ovelser => (
                    <article className="ovelser">
                        <h3>{ovelser.name}</h3>
                    </article>
                ))}
            </section>
        </section>
    );
}
