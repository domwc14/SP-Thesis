import { useState, useEffect} from "react";
import { useInventoryContext } from "../hooks/useInventoryContext";
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
import AddInventoryForm from "../components/AddInventoryForm";
import UpdateInventoryForm from "../components/UpdateInventoryForm";
import DeleteInventoryForm from "../components/DeleteInventoryForm";
import {FormControl, InputAdornment, OutlinedInput, Radio, RadioGroup, FormControlLabel} from '@mui/material';


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

    
//DIALOGUES 

const AddFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Inventory</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <AddInventoryForm/>
                {/* <WorkoutForm/> */}
            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="AddInventoryForm">Add</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const UpdateFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update an Item</DialogTitle>
            <DialogContent>

                {/* Your form content goes here */}
                <UpdateInventoryForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="UpdateInventoryForm">Update</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  

const DeleteFormDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete Inventory</DialogTitle>
            <DialogContent>
                {/* Your form content goes here */}
                <DeleteInventoryForm/>

            </DialogContent>
            <DialogActions>
                <Button size="large" style={{ marginRight: '10px' }} type="submit" form="DeleteInventoryForm">Delete</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};  



//START OF EXPORTED FUNCTION / RETURN 

const InventoryPage = () => {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const {inventory_list,dispatch} = useInventoryContext()

    const [query,setQuery] = useState('')
    const [searchField, setSearchField] = useState('product_code');



    const {user} = useAuthContext()


    console.log("b4 fetch JSON",inventory_list)

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
        const fetchInventory = async () => {
            const response = await fetch('/api/product',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                dispatch({type:'SET_INVENTORY',payload: json})
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
            fetchInventory()
        }
    },[dispatch,user]) //everytime these dependencies are run / changed, rerun this function (in this case everytime may dispatch, re-run)
    
    

    console.log("AFTER FETCH JSON",inventory_list)
    console.log("TYPE:",typeof(inventory_list))
    //const inventoryJSONtoArray = Object.entries(inventory_list)
    // console.log("ARRAY TYPE:",typeof(inventoryJSONtoArray))
    // console.log("ARRAY ACTUAL:",inventoryJSONtoArray)
    //console.log("LIST",inventoryJSONtoArray)




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (inventory_list === null) {          //BUFFER while d pa nag loload
        return <div>Loading...</div>;
    }

    const filtered_inventory_list = inventory_list.filter(item=>{

        const fieldValues = item[searchField];  //this is all the values of the item. 
        // console.log("FIELDVALUE", fieldValues)
        // console.log("TYPEOFFIELDVALUE", typeof (fieldValues))

        //if fieldValue is empty (nagclick ng radio button ng walang nakatype) do nothing. if may search na +
        //&& typeof(fieldValues) === 'string'
        
        //because I think 0 is also null. not sure, basta line below is needed so that it also shows 0
        if (fieldValues !== undefined && fieldValues !== null) {
            if (typeof(fieldValues) === 'string') {
                return fieldValues.toLowerCase().includes(query.toLowerCase());
            } 
            else if (typeof fieldValues === 'number') {
                // if (query === '0'){
                //     console.log("QUERY IS ZERO")
                //     console.log("FIELDVALUE", fieldValues)
                //     return fieldValues === 0.
                // }
                return fieldValues === Number(query);  // Convert query to number for comparison
            }

            // convert values of product.stock to string first because includes is a string 
            
            // const stringValue = fieldValues.toString();
            // console.log("STRVALUE IS 0",stringValue)
            // return stringValue.includes(query);

        }
        else {
            return false
        }

        //if not searchField:
        //return item.product_code.toLowerCase().includes(query.toLowerCase());
    })

     const rows = filtered_inventory_list
    //const rows = inventory_list


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
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 2fr', gap:0}}>
        <div><NavDrawer/></div>
        <div >
        <Stack direction="row" spacing={2} marginBottom={2} alignItems="flex-start" marginTop={1}>
            <button style={{}} className="green_button_round" onClick={handleOpenAddForm}> ADD </button>
            <button style={{}} className="green_button_round" onClick={handleOpenUpdateForm}> UPDATE </button>
            <button style={{}} className="green_button_round" onClick={handleOpenDeleteForm}> DELETE </button>
            {/* <StyledButton onClick={handleOpenAddForm}> Add </StyledButton>
            <StyledButton onClick={handleOpenUpdateForm}> Update </StyledButton>
            <StyledButton onClick={handleOpenDeleteForm}> Delete</StyledButton> */}

            <Box sx={{ width: '90%', ml: { xs: 0, md: 1 } }}>
                <FormControl onChange={(e)=>setQuery(e.target.value)} sx={{ marginRight:2, width: { xs: '10%', md: 224 } }}>
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

                <FormControl component="setsearchfield">
                    <RadioGroup
                        row
                        aria-label="searchCriteria"
                        name="searchCriteria"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <FormControlLabel value="product_code" control={<Radio size="small"  />} label="Product Code" />
                        <FormControlLabel value="stock" control={<Radio size="small" />} label="Stock" />
                        <FormControlLabel value="type" control={<Radio size="small" />} label="Type" />
                        <FormControlLabel value="size" control={<Radio size="small" />} label="Size" />
                        <FormControlLabel value="color" control={<Radio size="small" />} label="Color" />
                        <FormControlLabel value="acquisition_price" control={<Radio size="small" />} label="Acquisition Price" />
                        <FormControlLabel value="unit_price" control={<Radio size="small" />} label="Unit Price" />
                        
                        {/* <FormControlLabel value="unit" control={<Radio />} label="Unit" /> */}
                    </RadioGroup>
                    </FormControl>
            </Box>



            {/* <Searchbar/> */}
            <AddFormDialog open={isAddFormVisible} onClose={handleCloseForms} />
            <UpdateFormDialog open={isUpdateFormVisible} onClose={handleCloseForms} />
            <DeleteFormDialog open={isDeleteFormVisible} onClose={handleCloseForms} />

        </Stack>

        
        {/* stickyHeader */}
        <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Code</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Size</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Acquisition Price</StyledTableCell>
            <StyledTableCell align="right">Unit Price</StyledTableCell>
            <StyledTableCell align="right">Unit</StyledTableCell>
          </TableRow>
        </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row) => (
                <StyledTableRow key={row.product_code}>
                <TableCell style={{ width: 120 }} component="th" scope="row">
                    {row.product_code}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.stock}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.type}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.size}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.color}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.description}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.acquisition_price}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.unit_price}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    {row.unit}
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


export default InventoryPage;

//page={page} onChange={handlePage}