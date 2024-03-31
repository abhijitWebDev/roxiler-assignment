import './component.css';

const TransactionsTable = ({data}) => {
    

    return (
      <table className="myTable">
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Description</th>
      <th>Category</th>
      <th>Price</th>
      <th>Sold</th>
      <th>Image</th>
      
      <th>Date of Sale : (mm-dd-yyyy)</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(data) && data.map((transaction, index) => {
      return (
        <tr key={index}>
          <td>{transaction?.title}</td>
          <td>{transaction?.description}</td>
          <td>{Math.round(transaction?.price)}</td>
          <td>{transaction?.category}</td>
          <td>{transaction?.sold}</td>
          <td>{transaction?.image}</td>
          
          <td>{new Date(transaction?.dateOfSale).toLocaleDateString()}</td>
        </tr>
      );
    })}
  </tbody>
</table>
    );
};

export default TransactionsTable;