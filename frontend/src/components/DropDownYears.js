import React, { useState, useEffect } from 'react';

const DropDownYears = ({ onSelectYears, initialSelectedYears }) => {


  const [isOpen, setIsOpen] = useState(false);
  const years = [];
  const [selectedYears, setSelectedYears] = useState(initialSelectedYears);

  //insert years to years array
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  for (let year = 2020; year <= currentYear ; year++){
    years.push(year.toString() )
  }

  useEffect(() => {
    // If initialSelectedYears prop changes, update the selectedYears state
    setSelectedYears(initialSelectedYears || []);
  }, [initialSelectedYears]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (year) => {
    // Toggle the selection of the year
    setSelectedYears((prevSelectedYears) => {
      if (prevSelectedYears.includes(year)) {
        return prevSelectedYears.filter((selectedYear) => selectedYear !== year);
      } else {
        return [...prevSelectedYears, year];
      }
    });
  };

  const handleApplySelection = () => {
    // Pass the selectedYears to the parent component
    onSelectYears(selectedYears);
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    // Select all years
    setSelectedYears([...years]);
  };

  const handleDeselectAll = () => {
    // Deselect all years
    setSelectedYears([]);
  };



  return (
    <div className="dropdownyears">
      <button className="dropbtn" onClick={toggleDropdown}>
        Select Years
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {years.map((year) => (
            <label className="report_checkbox" key={year}>
              {year}
              <input
                type="checkbox"
                value={year}
                onChange={() => handleCheckboxChange(year)}
                checked={selectedYears.includes(year)}
              />
            </label>
          ))}

          <label className="report_checkbox">
            Select All
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedYears.length === years.length}
            />
          </label>
          <label className="report_checkbox">
            Deselect All
            <input
              type="checkbox"
              onChange={handleDeselectAll}
              checked={selectedYears.length === 0}
            />
          </label>




          <button sx={{marginTop: '5px' }} onClick={handleApplySelection}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default DropDownYears;