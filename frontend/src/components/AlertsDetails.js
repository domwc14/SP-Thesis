//components

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';

const AlertsDetails = ({alert}) => {
    //currently alert here is a Product

//className="overduesalesinvoice-details" 
    return (
        <div className="overduesalesinvoice-details" >
            <Alert style={{ textDecoration: 'none' }} component={Link } to={'/product'} severity={alert.stock === 0 ? 'error' : 'warning'}  sx={{

                padding: '1rem 1.5rem 1rem',
                borderRadius: '16px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Box shadow for depth
            }} variant="outlined">
            <AlertTitle > <h4>
                {alert.stock === 0
                ? `${alert.product_code} is out of stock.`
                : `${alert.product_code} is about to run out of stock.`}
                 </h4>
            </AlertTitle>
            <strong>{alert.product_code} is set to notify when there is {alert.stocktrigger_at} {alert.unit} or less left. </strong>


            {/* <p><strong> Load(kg):</strong>{overdueSI.customer.name}</p> */}
            {/* <p><strong> Customer Name: </strong>{overdueSI.customer.name}</p> */}
            
            </Alert>



            {/* <Card sx={{
                border: '2px solid #1aac83', // Green border
                padding: '1rem 1.5rem 1rem',
                borderRadius: '16px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Box shadow for depth
            }} variant="outlined">
            <h4> Alert!  {alert.product_code} is out of stock.</h4>
            {/* <p><strong> Load(kg):</strong>{overdueSI.customer.name}</p> */}
            {/* <p><strong> Customer Name: </strong>{overdueSI.customer.name}</p> */}
            
            {/* </Card> */}
        </div>
    )
}

export default AlertsDetails