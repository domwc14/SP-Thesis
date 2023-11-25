    import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
    import { useAuthContext } from "../hooks/useAuthContext"


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

    //className="overduesalesinvoice-details"
        return (
            <div >
                <h4> Invoice Number: {overdueSI.invoice_number}</h4>
                {/* <p><strong> Load(kg):</strong>{overdueSI.customer.name}</p> */}
                <p><strong> Customer Name:</strong>{overdueSI.customer.name}</p>
                <p><strong> Date:</strong>{overdueSI.date}</p>
                <p><strong> Payment Due: </strong>{overdueSI.payment_due}</p>
                <p><strong> Amount Paid: </strong>{overdueSI.amount_paid}</p>
                <p><strong> Date Paid: </strong>{overdueSI.date_paid}</p>
                <p><strong> Payment Terms </strong>{overdueSI.payment_terms}</p>
                <p><strong> Total Amount:</strong>{overdueSI.total_amount}</p>

                <Button onClick={Download_PDF.bind(this, overdueSI)}> Download the PDF </Button>
                {/* Button click is like that so that it only ACTUALLY runs ONLY when its clicked, NOT after initial page rendering */}
                {/* <span className="material-symbols-outlined" onClick={handleTick}>delete</span> */}
            </div>
        )
    }

    export default OverdueSalesInvoiceDetails

