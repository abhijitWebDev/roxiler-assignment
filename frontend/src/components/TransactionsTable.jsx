import './component.css';

const TransactionsTable = ({data}) => {
    

    return (
      <table className="myTable">
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Date of Sale : (mm-dd-yyyy)</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(data) && data.map((transaction, index) => {
      return (
        <tr key={index}>
          <td>{transaction?.title}</td>
          <td>{transaction?.category}</td>
          <td>{Math.round(transaction?.price)}</td>
          <td>{new Date(transaction?.dateOfSale).toLocaleDateString()}</td>
        </tr>
      );
    })}
  </tbody>
</table>
    );
};

export default TransactionsTable;