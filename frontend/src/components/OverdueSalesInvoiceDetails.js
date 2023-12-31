
    import Card from '@mui/material/Card';

    //components
    import { Button } from "@mui/material";

    import {pdf} from "@react-pdf/renderer";
    import Invoice from "./Invoice"
    import { saveAs } from 'file-saver';


    const Download_PDF = async (overdueSI) => {
        var DocumentHolder = await Invoice(overdueSI)

        //Reasonings: PDFDownloadLink is only a link to download, but can only handle non-changing data (so no variables)
        //so we pass overdueSI (detail of SI), then create a new document with that, then use code below to save.
        const blob = await pdf(DocumentHolder).toBlob()
        saveAs(blob, overdueSI.invoice_number + 'untitled.pdf')

      }


    const OverdueSalesInvoiceDetails = ({overdueSI}) => {
        //formatDate

        const dateObject = new Date(overdueSI.date);
        const formattedDate = new Intl.DateTimeFormat('en-US').format(dateObject);

        const dateObject2 = new Date(overdueSI.payment_due);
        const formattedPaymentDue = new Intl.DateTimeFormat('en-US').format(dateObject2);
    //className="overduesalesinvoice-details"
        return (
            <div className="overduesalesinvoice-details" >
                <Card sx={{
                    border: '2px solid #1aac83', // Green border
                    padding: '1rem 1.5rem 1rem',
                    borderRadius: '16px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Box shadow for depth
                }} variant="outlined">
                <h4> Invoice Number: {overdueSI.invoice_number}</h4>
                {/* <p><strong> Load(kg):</strong>{overdueSI.customer.name}</p> */}
                <p><strong> Customer Name: </strong>{overdueSI.customer.name}</p>
                
                <p><strong> Date: </strong>{formattedDate}</p>
                <p><strong> Payment Due: </strong>{formattedPaymentDue}</p>
                <p><strong> Amount Paid: </strong>{overdueSI.amount_paid}</p>
                <p ><strong> Date Paid: </strong>{overdueSI.date_paid}</p>
                <p ><strong> Payment Terms: </strong>{overdueSI.payment_terms}</p>
                <p ><strong> Total Amount:</strong>{overdueSI.total_amount}</p>

                <button style={{ marginTop: '5px' }} className="green_button" onClick={Download_PDF.bind(this, overdueSI)}> Download the PDF </button>
                {/* Button click is like that so that it only ACTUALLY runs ONLY when its clicked, NOT after initial page rendering */}
                {/* <span className="material-symbols-outlined" onClick={handleTick}>delete</span> */}
                </Card>
            </div>
        )
    }

    export default OverdueSalesInvoiceDetails

