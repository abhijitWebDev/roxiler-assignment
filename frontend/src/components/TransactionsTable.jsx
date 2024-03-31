const TransactionsTable = ({data}) => {
    

    return (
      <table style={{ border: '1px solid black', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px' }}>Product Name</th>
            <th style={{ padding: '10px' }}>Category</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((transaction, index) => {
            return (
              <tr key={index}>
                <td style={{ padding: '10px' }}>{transaction?.title}</td>
                <td style={{ padding: '10px' }}>{transaction?.category}</td>
                <td style={{ padding: '10px' }}>{transaction?.price}</td>
                <td style={{ padding: '10px' }}>{new Date(transaction?.dateOfSale).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
};

export default TransactionsTable;