
import {Product} from "../models/product.model.js";
const getData = async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = await response.json();
    console.log(data.length);

    for (let i = 0; i < data.length; i++) {
      const product = new Product({
        id: data[i].id,
        title: data[i].title,
        price: data[i].price,
        description: data[i].description,
        category: data[i].category,
        image: data[i].image,
        sold: data[i].sold,
        dateOfSale: data[i].dateOfSale,
      });
      await product.save();

    //   // put a check here to see if the product is already present in the database
      
     }
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error("Error in getData", error);
  }
};

/*
Create an API to list the all transactions
- API should support search and pagination on product transactions
- Based on the value of search parameters, it should match search text on product
title/description/price and based on matching result it should return the product
transactions
- If search parameter is empty then based on applied pagination it should return all the
records of that page number
- Default pagination values will be like page = 1, per page = 10
 */
const getTransactions = async (req, res) => {
  console.log("getTransactions", req.query);
  try {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let { page = 1, perPage = 10, search = "", month="March" } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    month = monthNames.indexOf(month) + 1;
    const transactions = await Product.find({
      $or: [
        {category: { $regex: search, $options: "i" }},
        {title: { $regex: search, $options: "i" }},
        {description: { $regex: search, $options: "i" }},
        {price: { $regex: search, $options: "i" }},
        
      ],
    })
      .limit(perPage)
      .skip(perPage * (page - 1));

    console.log("transactions", transactions.length);
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error in getTransactions", error);
  }
};

/* Create an API for statistics
- Total sale amount of selected month
- Total number of sold items of selected month
- Total number of not sold items of selected month
*/

const getStatistics = async (req,res) => {
  try {
    const { month } = req.query;
    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
    ]);

    console.log("totalSaleAmount", totalSaleAmount);

    const totalSoldItems = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSoldItems: { $sum: 1 },
        },
      },
    ]);

    console.log("totalSoldItems", totalSoldItems);

    const totalNotSoldItems = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
          },
          sold: false,
        },
      },
      {
        $group: {
          _id: null,
          totalNotSoldItems: { $sum: 1 },
        },
      },
    ]);
    
    console.log("totalNotSoldItems", totalNotSoldItems)

    res.send({ totalSaleAmount, totalSoldItems, totalNotSoldItems });

    return {
      totalSaleAmount: totalSaleAmount[0].totalSaleAmount,
      totalSoldItems: totalSoldItems[0].totalSoldItems,
      totalNotSoldItems: totalNotSoldItems[0].totalNotSoldItems,
    };
  } catch (error) {
    console.error("Error in getStatistics", error);
    throw error;
  }
};

/*
GET
Create an API for bar chart ( the response should contain price range and the number
of items in that range for the selected month regardless of the year )
- 0 - 100
- 101 - 200
- 201-300
- 301-400
- 401-500
- 501 - 600
- 601-700
- 701-800
- 801-900
- 901-above
 */

const getBarChart = async (req, res) => {
  try {
    const { month } = req.query;
    const barChart = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
          },
        },
      },
      {
        $addFields: {
          priceAsNumber: { $toDouble: "$price" },
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ["$priceAsNumber", 100] }, then: "0 - 100" },
                { case: { $lte: ["$priceAsNumber", 200] }, then: "101 - 200" },
                { case: { $lte: ["$priceAsNumber", 300] }, then: "201 - 300" },
                { case: { $lte: ["$priceAsNumber", 400] }, then: "301 - 400" },
                { case: { $lte: ["$priceAsNumber", 500] }, then: "401 - 500" },
                { case: { $lte: ["$priceAsNumber", 600] }, then: "501 - 600" },
                { case: { $lte: ["$priceAsNumber", 700] }, then: "601 - 700" },
                { case: { $lte: ["$priceAsNumber", 800] }, then: "701 - 800" },
                { case: { $lte: ["$priceAsNumber", 900] }, then: "801 - 900" },
              ],
              default: "901 - above",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ barChart });
    return barChart;
  } catch (error) {
    console.error("Error in getBarChart", error);
    throw error;
  }
};

/*
GET
Create an API for pie chart Find unique categories and number of items from that
category for the selected month regardless of the year.
For example :
- X category : 20 (items)
- Y category : 5 (items)
- Z category : 3 (items)
*/

const getPieChart = async (req,res) => {
  try {
    const { month } = req.query;
    const pieChart = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.send({ pieChart });

    return pieChart;
  } catch (error) {
    console.error("Error in getPieChart", error);
    throw error;
  }
};

/*
GET
Create an API which fetches the data from all the 3 APIs mentioned above, combines
the response and sends a final response of the combined JSON
*/

const getCombinedData = async (req, res) => {
  try {
    const data = await Promise.all([
      getStatistics(req),
      getBarChart(req),
      getPieChart(req),
    ]);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in getCombinedData", error);
  }
};



export { getData, getTransactions, getStatistics, getBarChart, getPieChart, getCombinedData};
