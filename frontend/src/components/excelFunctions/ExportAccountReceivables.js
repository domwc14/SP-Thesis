    import React from 'react';
    import * as XLSX from 'xlsx';
    import { saveAs } from 'file-saver'; // Import for browser-based saving
    import { useAuthContext } from '../../hooks/useAuthContext';
    const ExportAccountsReceivables = () => {
        const {user} = useAuthContext()

    const handleExportClick = async () => {
        const response = await fetch(`/api/salesinvoice/getReceivables`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json() //its the response json from server
        if(response.ok){
            console.log("ACCOUNTS RECEIABLE",json)
            const jsonData = json.salesinvoices
            const jsonTotal = json.accounts_receivable
            for (let i = 0; i < jsonData.length; i++) {     //remove some columns
                const { _id, __v, description, BIR_2307, SR, CR_Number, purchase_list,  ...rest } = jsonData[i];
                jsonData[i] = rest;
            }

            const finaljsonData = [];
            for (let i = 0; i < jsonData.length; i++) {
                const invoice = jsonData[i];
                const transformedInvoice = {
                    ...invoice,
                    customer: invoice.customer.name, // Replace "customer" with "customer.name"
                };
                finaljsonData.push(transformedInvoice);
            }

                    // Create a worksheet from the JSON data
            const ws = XLSX.utils.json_to_sheet(finaljsonData);

            ws['A1'] = { v: 'Invoice Number', t: 's' }; // Assuming _id is in column A
            ws['B1'] = { v: 'Reference PO', t: 's' };
            ws['C1'] = { v: 'Customer', t: 's' }; // Assuming _id is in column A
            ws['D1'] = { v: 'Date Made', t: 's' };
            ws['E1'] = { v: 'Total Amount', t: 's' }; // Assuming _id is in column A
            ws['F1'] = { v: 'Payment Terms', t: 's' };
            ws['G1'] = { v: 'Payment Due', t: 's' }; // Assuming _id is in column A
            ws['H1'] = { v: 'Amount Paid', t: 's' };
            ws['I1'] = { v: 'Days Overdue', t: 's' }; // Assuming _id is in column A
            ws['J1'] = { v: 'Date Paid', t: 's' };
            ws['L1'] = { v: 'Total Receivables (Php)', t: 's' };
            XLSX.utils.sheet_add_aoa(ws, [[jsonTotal]], { origin: 'L2' });
            // Create a workbook with the worksheet
            const wb = {
                Sheets:{
                [ `Accounts Receivables`]: ws,
                },
                SheetNames:[`Accounts Receivables`]
            };
            const excelBuffer = XLSX.write(wb,{bookType: 'xlsx',type: "array", })
            console.log("EXCEL BUFFER", excelBuffer)

            const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
            saveAs(blob, `Accounts Receivables.xlsx`);
            
        }
        else {
            return 
        }



    };

    return (
        <button onClick={handleExportClick}>
        Download Excel file of Accounts Receivables
        </button>
    );

    };

    export default ExportAccountsReceivables;