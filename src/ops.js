// convert is_open to active/inactive
export const getStatusText = (is_open) => is_open ? 'Active' : 'Inactive'

// convert iso date to dd/mm/yyyy
export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
        dateStyle: 'short'
    });
};

// format amount as currency
const formatCurrency = (amount) => {
    // if amount is null or not a number use $0.00 default
    if (amount == null || isNaN(amount)) {
        console.error('Invalid amount', amount);
        return '$0.00'
    }
    // if valid number, return as currency
    return `$${amount.toFixed(2)}`;
};

// format date-time stamp
export const formatDateTime = (isoString) => {
    if (!isoString) {
        console.error('Invalid date:', isoString);
        return 'Invalid date';
    }
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
        dateStyle: 'short', 
        timeStyle: 'short'
    });
};