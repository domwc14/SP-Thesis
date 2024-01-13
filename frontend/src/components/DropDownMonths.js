import React, { useState, useEffect } from 'react';

const DropDownMonths = ({ onSelectMonths, initialSelectedMonths }) => {
  const [isOpen, setIsOpen] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [selectedMonths, setSelectedMonths] = useState(initialSelectedMonths);

  useEffect(() => {
    // If initialSelectedMonths prop changes, update the selectedMonths state
    setSelectedMonths(initialSelectedMonths || []);
  }, [initialSelectedMonths]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (month) => {
    // Toggle the selection of the month
    setSelectedMonths((prevSelectedMonths) => {
      if (prevSelectedMonths.includes(month)) {
        return prevSelectedMonths.filter((selectedMonth) => selectedMonth !== month);
      } else {
        return [...prevSelectedMonths, month];
      }
    });
  };

  const handleApplySelection = () => {
    // Pass the selectedMonths to the parent component
    onSelectMonths(selectedMonths);
    setIsOpen(false);
  };

  return (
    <div className="dropdownmonths">
      <button className="dropbtn" onClick={toggleDropdown}>
        Select Months
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {months.map((month) => (
            <label className="report_checkbox" key={month}>
              {month}
              <input
                type="checkbox"
                value={month}
                onChange={() => handleCheckboxChange(month)}
                checked={selectedMonths.includes(month)}
              />
            </label>
          ))}
          <button sx={{marginTop: '5px' }} onClick={handleApplySelection}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default DropDownMonths;