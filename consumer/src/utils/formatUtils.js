export const formatPrice = (amount) => {
    if (typeof amount === 'number') {
        return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return 'Rs. 0.00';  
};
