const Transaction = require('../models/Transaction'); // Import the Transaction model
const ExcelJS = require('exceljs'); // ExcelJS library for creating Excel files

// Export transactions to an Excel file
const exportTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch transactions for the user
        const transactions = await Transaction.find({ userId });

        // If no transactions found, respond with an error
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the user' });
        }

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Transactions');

        // Add headers to the worksheet
        worksheet.columns = [
            { header: 'Transaction ID', key: '_id', width: 30 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Type', key: 'type', width: 15 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Date', key: 'date', width: 25 },
        ];

        // Add data rows
        transactions.forEach((transaction) => {
            worksheet.addRow({
                _id: transaction._id.toString(), // Ensure the ID is stringified
                amount: transaction.amount,
                category: transaction.category,
                type: transaction.type,
                description: transaction.description || 'N/A',
                date: transaction.date.toISOString(),
            });
        });

        // Format the header row
        worksheet.getRow(1).font = { bold: true };

        // Prepare the file for download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=transactions_${userId}.xlsx`);

        // Write the workbook to the response stream
        await workbook.xlsx.write(res);

        // End the response to ensure proper delivery
        res.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { exportTransactions };