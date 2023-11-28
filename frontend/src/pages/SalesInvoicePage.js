import { useState, useEffect} from "react";
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useAuthContext } from "../hooks/useAuthContext";


//mui table
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Stack from '@mui/material/Stack';


//components
import NavDrawer from "../components/NavDrawer";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddSalesInvoiceForm from "../components/AddSalesInvoiceForm";
import UpdateSalesInvoiceForm from "../components/UpdateSalesInvoiceForm";
import DeleteSalesInvoiceForm from "../components/DeleteInventoryForm";
import {FormControl, InputAdornment, OutlinedInput } from '@mui/material';


//FRONTEND DESIGN PART

const StyledButton = styled(Button)({
    variant:"contained",
    borderRadius: '20px', // You can adjust the value to control the roundness
    padding: '10px 20px', // Adjust padding as needed
    color: 'black',
    backgroundColor: 'grey'
  });



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        </Box>
    );
    }

    TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    };


    //STYLES OF TABLE HEADER AND TABLE ROW
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


//YOU ARE HERE YOU ARE HERE YOU ARE HERE
    
//DIALOGUES 

const AddFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Sales Invoice</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <AddSalesInvoiceForm/>
                {/* <WorkoutForm/> */}
            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="AddSalesInvoiceForm">Add</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const UpdateFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update a Sales Invoice</DialogTitle>
            <DialogContent>

                {/* Your form content goes here */}
                <UpdateSalesInvoiceForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="UpdateSalesInvoiceForm">Update</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const DeleteFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete SalesInvoice</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <DeleteSalesInvoiceForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="DeleteSalesInvoiceForm">Delete</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  



//START OF EXPORTED FUNCTION / RETURN 

const SalesInvoicePage = () => {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const {sales_invoice_list,dispatch} = useSalesInvoiceContext()
    const [query,setQuery] = useState('')
    const {user} = useAuthContext()

    console.log("b4 fetch JSON",sales_invoice_list)

    console.log("QUERY",query)


    //FUNCTIONAL BUTTONS

    const handleOpenAddForm = async () => {
        setAddFormVisible(true);
    }
    
    const handleOpenUpdateForm = async () => {
        setUpdateFormVisible(true);
    }
    
    const handleOpenDeleteForm = async () => {
        setDeleteFormVisible(true);
    }
    
    const handleCloseForms = () => {
        setAddFormVisible(false);
        setUpdateFormVisible(false);
        setDeleteFormVisible(false);
    };


    useEffect(()=>{
        const fetchSalesInvoice = async () => {
            const response = await fetch('/salesinvoice',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                dispatch({type:'SET_SALES_INVOICE',payload: json})
                console.log("json FETCHED")
                //dispatch fires to workoutsReducer - > returns action - > updates the state sa useReducer
                //yung workouts: null magiging action.payload which is the json here
                //yung Workouts.Context.Provider value catches that. Its the ...state change (eto yung "global" context state)
                //this updates the workouts in  const {workouts,dispatch} = useWorkoutsContext() which is used sa UI
            }
            else{
                console.log("dispatch not made")
            }
        }

        if(user){
            fetchSalesInvoice()
        }
    },[dispatch,user]) //everytime these dependencies are run / changed, rerun this function (in this case everytime may dispatch, re-run)
    
    
    console.log("AFTER FETCH JSON",sales_invoice_list)
    console.log("TYPE:",typeof(sales_invoice_list))
    //const inventoryJSONtoArray = Object.entries(sales_invoice)
    // console.log("ARRAY TYPE:",typeof(inventoryJSONtoArray))
    // console.log("ARRAY ACTUAL:",inventoryJSONtoArray)
    //console.log("LIST",inventoryJSONtoArray)




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (sales_invoice_list === null) {          //BUFFER while d pa nag loload
        return <div>Loading...</div>;
    }

    const filtered_sales_invoice = sales_invoice_list.filter(item=>{
        return item.invoice_number.toLowerCase().includes(query.toLowerCase())
        //maybe if need. try item.$variablefieldfind
    })

     const rows = filtered_sales_invoice
    //const rows = sales_invoice


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 2fr', gap:1}}>
        <div><NavDrawer/></div>
        <div>
        <Stack direction="row" spacing={2} marginBottom={2}>
            <StyledButton onClick={handleOpenAddForm}> Add </StyledButton>
            <StyledButton onClick={handleOpenUpdateForm}> Update </StyledButton>
            <StyledButton onClick={handleOpenDeleteForm}> Delete</StyledButton>
            <Box sx={{ width: '10%', ml: { xs: 0, md: 1 } }}>
                <FormControl onChange={(e)=>setQuery(e.target.value)} sx={{ width: { xs: '10%', md: 224 } }}>
                    <OutlinedInput
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    placeholder="Search Product Code"
                    />
                </FormControl>
            </Box>
            <AddFormDialog open={isAddFormVisible} onClose={handleCloseForms} />
            <UpdateFormDialog open={isUpdateFormVisible} onClose={handleCloseForms} />
            <DeleteFormDialog open={isDeleteFormVisible} onClose={handleCloseForms} />

        </Stack>


        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Number</StyledTableCell>
            <StyledTableCell align="right">Reference_PO</StyledTableCell>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Total Amount</StyledTableCell>
            <StyledTableCell align="right">Payment Terms</StyledTableCell>
            <StyledTableCell align="right">Payment Due</StyledTableCell>
            <StyledTableCell align="right">Date Paid</StyledTableCell>
            <StyledTableCell align="right">Amount Paid</StyledTableCell>
            <StyledTableCell align="right">BIR 2307</StyledTableCell>
            <StyledTableCell align="right">SR</StyledTableCell>
            <StyledTableCell align="right">CR Number</StyledTableCell>
            <StyledTableCell align="right">Purchase List</StyledTableCell>
          </TableRow>
        </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row) => (
                <StyledTableRow key={row.invoice_number}>
                <TableCell style={{ width: 120 }} component="th" scope="row">
                    {row.invoice_number}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.reference_PO}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.customer.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.date}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.description}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.total_amount}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.payment_terms}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.payment_due}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.date_paid}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.amount_paid}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.BIR_2307}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.SR}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.CR_Number}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    <h4>Purchase List Here*</h4>
                </TableCell>
                </StyledTableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
        </div>
    </Box>
    );
}


export default SalesInvoicePage;

//page={page} onChange={handlePage}