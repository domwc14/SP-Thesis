import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import for browser-based saving
const ExportSalesInvoice = ({ jsonData }) => {
    //console.log("inside export", jsonData)
    
  const modifiedData = jsonData.map(item => {
    const { _id, __v, purchase_list, customer, ...rest } = item;
    return { ...rest, customer: customer.name };
  });
  
  
  // Modify the data (e.g., format date)
  for (let i = 0; i < modifiedData.length; i++) {
    let formattedDate = modifiedData[i].date ? modifiedData[i].date.split("T")[0] : '';
    let formattedDate2 = modifiedData[i].payment_due ? modifiedData[i].payment_due.split("T")[0] : '';
    let formattedDate3 = modifiedData[i].date_paid ? modifiedData[i].date_paid.split("T")[0] : '';
    modifiedData[i].date = formattedDate;
    modifiedData[i].payment_due = formattedDate2;
    modifiedData[i].date_paid = formattedDate3;
  }
  

  const handleExportClick = () => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    ws['A1'] = { v: 'Invoice Number', t: 's' }; // Assuming _id is in column A
    ws['B1'] = { v: 'Reference PO', t: 's' }; 
    ws['C1'] = { v: 'Date', t: 's' }; 
    ws['D1'] = { v: 'description', t: 's' }; // Assuming _id is in column A
    ws['E1'] = { v: 'Total Amount ', t: 's' }; 
    ws['F1'] = { v: 'Payment Terms', t: 's' }; 
    ws['G1'] = { v: 'Payment Due', t: 's' }; // Assuming _id is in column A
    ws['H1'] = { v: 'Date Paid', t: 's' }; 
    ws['I1'] = { v: 'Amount Paid', t: 's' }; 
    ws['J1'] = { v: 'BIR 2307', t: 's' }; // Assuming _id is in column A
    ws['K1'] = { v: 'Sales Rep.', t: 's' }; 
    ws['L1'] = { v: 'CR Number', t: 's' }; 
    ws['M1'] = { v: 'Customer', t: 's' }; 

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
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Invoices');
    // XLSX.utils.book_append_sheet(wb, ws2, 'Details'); // Make sure the sheet name is 'Details'



    const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })


    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, "SalesInvoice.xlsx");
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  };

  return (
    <button onClick={handleExportClick}>
      Export to Excel
    </button>
  );
};

export default ExportSalesInvoice;