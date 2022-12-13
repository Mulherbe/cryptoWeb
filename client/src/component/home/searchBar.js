import { useState } from "react";
import '../../assets/css/search.css';
var data = require("./DATA.json");

export default function Search() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  return (
<>
        <div className="search-inner">
          <form>            
            <input type="text" className='input-search' value={value} onChange={onChange} />
              <button className='btn-search' onClick={() => onSearch(value)}><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.full_name)}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>
</>
  );
}

