import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import for browser-based saving
const ExportClient = ({ jsonData }) => {
  //console.log("inside export", jsonData)
    
  const modifiedData = jsonData.map(item => {
    const { _id, __v, ...rest } = item;
    return { ...rest, };
  });
   

  const handleExportClick = () => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    ws['A1'] = { v: 'Client', t: 's' }; // Assuming _id is in column A
    ws['B1'] = { v: 'Type', t: 's' }; 
    ws['C1'] = { v: 'Location', t: 's' }; 
    ws['D1'] = { v: 'Market', t: 's' }; // Assuming _id is in column A

    // Get the current date
    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/\//g, '-');

    // const ws2 = XLSX.utils.aoa_to_sheet([["Date Downloaded"], [formattedDate]]);

    XLSX.utils.sheet_add_aoa(ws, [
      ["Date Downloaded"],                             // <-- Write 1 to cell B3
      [formattedDate],
    ], { origin: "S2" });


    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients List');
    // XLSX.utils.book_append_sheet(wb, ws2, 'Details'); // Make sure the sheet name is 'Details'



    const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })


    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, "Clients List.xlsx");
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  };

  return (
    <button onClick={handleExportClick}>
      Export to Excel
    </button>
  );
};

export default ExportClient;