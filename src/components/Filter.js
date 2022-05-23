
export default function Filter( { handleFilters }) {
    function handleChange(event){
        const checkboxes = event.target.form.elements;
        const selectedCheckboxes = [];

        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                selectedCheckboxes.push(checkbox.value);
            }
        }

        handleFilters(selectedCheckboxes);
    }
    
  
  return (
    <form onChange={handleChange} className="filter-container">
        <label>
            Ben
            <input className="checkbox" type="checkbox" value="Ben" />
        </label>
        <label>
            Biceps
            <input className="checkbox" type="checkbox" value="Biceps" />
        </label>
        <label>
            Bryst
            <input className="checkbox" type="checkbox" value="Bryst" />
        </label>
        <label>
            Mave
            <input className="checkbox" type="checkbox" value="Mave" />
        </label>
        <label>
            Ryg
            <input className="checkbox" type="checkbox" value="Ryg" />
        </label>
        <label>
            Skulder
            <input className="checkbox" type="checkbox" value="Skulder" />
        </label>
        <label>
            Triceps
            <input className="checkbox" type="checkbox" value="Triceps" />
        </label>
        <label>
            Underarm
            <input className="checkbox" type="checkbox" value="Underarm" />
        </label>
    </form>
    );
}