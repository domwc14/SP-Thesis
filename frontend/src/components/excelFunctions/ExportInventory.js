import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import for browser-based saving
const ExportInventory = ({ jsonData }) => {
  //console.log("inside export", jsonData)
    
  const modifiedData = jsonData.map(item => {
    const { _id, __v, ...rest } = item;
    return { ...rest, };
  });
   

  const handleExportClick = () => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    ws['A1'] = { v: 'Product Code', t: 's' }; // Assuming _id is in column A
    ws['B1'] = { v: 'Stock', t: 's' }; 
    ws['C1'] = { v: 'Type', t: 's' }; 
    ws['D1'] = { v: 'Size', t: 's' }; // Assuming _id is in column A
    ws['E1'] = { v: 'Color', t: 's' }; // Assuming _id is in column A
    ws['F1'] = { v: 'Description', t: 's' }; 
    ws['G1'] = { v: 'Acquisition Price', t: 's' }; 
    ws['H1'] = { v: 'Unit Price', t: 's' }; // Assuming _id is in column A
    ws['I1'] = { v: 'Unit', t: 's' }; // Assuming _id is in column A
    ws['J1'] = { v: 'Alert Trigger', t: 's' }; // Assuming _id is in column A

    // Get the current date
    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/\//g, '-');

    // const ws2 = XLSX.utils.aoa_to_sheet([["Date Downloaded"], [formattedDate]]);

    XLSX.utils.sheet_add_aoa(ws, [
      ["Date Downloaded"],                             // <-- Write 1 to cell B3
      [formattedDate],
    ], { origin: "L2" });


    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    // XLSX.utils.book_append_sheet(wb, ws2, 'Details'); // Make sure the sheet name is 'Details'



    const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })


    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, "Inventory.xlsx");
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  };

  return (
    <button onClick={handleExportClick}>
      Export to Excel
    </button>
  );
};

export default ExportInventory;