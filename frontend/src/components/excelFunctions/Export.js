import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import for browser-based saving
const ExportButton = ({ jsonData }) => {
    console.log("inside export", jsonData)
  const handleExportClick = () => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(jsonData);

    ws['A1'] = { v: 'Month', t: 's' }; // Assuming _id is in column A

    // Create a workbook with the worksheet
    const wb = {
        Sheets:{
            'data': ws,
        },
        SheetNames:['data',"sheet2","sheet3"]
    };
    const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })
    console.log("EXCEL BUFFER", excelBuffer)

    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, "exported_data.xlsx");
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



    // const wbout = XLSX.write(wb, { type: "array", bookType: 'xlsx' }); // Correct book type and type
    // //const blob = XLSX.write(wb, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', type: 'blob' });

    // const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    // saveAs(blob, "exported_data.xlsx"); // Use file-saver for download

    
    // Create a download link and trigger the download
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = 'exported_data.xlsx';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <button onClick={handleExportClick}>
      Export to Excel
    </button>
  );
};

export default ExportButton;