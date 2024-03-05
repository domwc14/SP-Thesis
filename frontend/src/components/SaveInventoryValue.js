import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
const SaveInventoryValue = () => {
    const {user} = useAuthContext()

const handleClick = async () => {

    try {
        const response = await fetch(`/api/product/addmonthly`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            alert("Data is successfully saved");
        } else {
            alert("Failed to log data, please try again");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred, please try again later");
    }

};

return (
    <button onClick={handleClick}>
    Log current inventory value
    </button>
);

};

export default SaveInventoryValue;