import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import for browser-based saving
const ExportStockAlertsButton = async () => {
//     //console.log("inside export", jsonData)
//     for (let i = 0; i < jsonData.length; i++) {
//         const { _id, __v, ...rest } = jsonData[i];
//         jsonData[i] = rest;
//     }

//   const handleExportClick = () => {
//     // Create a worksheet from the JSON data
//     const ws = XLSX.utils.json_to_sheet(jsonData);

//     ws['A1'] = { v: 'Date', t: 's' }; // Assuming _id is in column A
//     ws['B1'] = { v: 'Inventory Value (Php)', t: 's' }; 

//     // Create a workbook with the worksheet
//     const wb = {
//         Sheets:{
//            [ `Monthly Inventory Values ${selectedYear3}`]: ws,
//         },
//         SheetNames:[`Monthly Inventory Values ${selectedYear3}`]
//     };
//     const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })
//     console.log("EXCEL BUFFER", excelBuffer)

//     const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
//     saveAs(blob, `Monthly Inventory Values ${selectedYear3}.xlsx`);
//   };

//   return (
//     <button onClick={handleExportClick}>
//       Download Excel file of Stock Report
//     </button>
//   );
};

export default ExportStockAlertsButton;