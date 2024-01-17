import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import for browser-based saving
const ExportButton2 = ({ jsonData }) => {
    console.log("inside export", jsonData)
  const handleExportClick = () => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(jsonData);

    ws['A1'] = { v: 'Year', t: 's' }; // Assuming _id is in column A
    ws['B1'] = { v: 'Total (Php)', t: 's' }; 
    ws['C1'] = { v: 'Invoice Count', t: 's' }; 

    // Create a workbook with the worksheet
    const wb = {
        Sheets:{
            'Yearly Sales Invoices': ws,
        },
        SheetNames:['Yearly Sales Invoices']
    };
    const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })


    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, "Yearly Sales Invoices.xlsx");
  };

  return (
    <button onClick={handleExportClick}>
      Export to Excel
    </button>
  );
};

export default ExportButton2;