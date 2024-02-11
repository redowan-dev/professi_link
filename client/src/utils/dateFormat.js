export const formatDateRange = (date) => {
    const startDateObj = new Date(date);
  
    const formattedStartDate = startDateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });
return formattedStartDate
  };