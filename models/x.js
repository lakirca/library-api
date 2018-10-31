
// POST /api/returns {customerId, bookId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if bookId is not provided
// Return 404 if no rental found for this customer/book
// Return 400 if rental already processed
// Return 200 if valid request 
// Set the return date
// Calculate the rental fee (numberOfDays * book.rentalRate)
// Increase the stock 
// Return the rental 
