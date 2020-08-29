/* eslint-disable no-restricted-syntax */
function itemsRender(items) {
  let str = '';
  for (const item of items) {
    str += `<tr>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
    </tr>`;
  }
  return str;
}

const render = ({
  id, createdAt, total, deliveryAddress, items,
}) => `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Order</title>
    <style type="text/css" rel="stylesheet" media="all">
    .center {
      margin-top: 50px;
    }
    .summary {
      margin-top: 50px;
      display: flex;
      justify-content: center !important;
    }
    .summary-body {
      width: 600px;
      background: #80808024;
      padding: 10px;
      display: grid;
      grid-template-columns: 350px auto !important;
    }
    .summary-title {
      font-size: larger;
      font-weight: 700;
    }
    .summary-list {
      font-size: large;
      padding: 10px 0px;
    }
    .mt-30 {
      margin-top: 20px;
    }
    .large {
      font-size: x-large;
      padding: 5px;
    }
    body {
      font-family: serif;
    }
    #customers {
      border-collapse: collapse;
      width: 650px;
    }
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
  
    #customers tr:nth-child(even){background-color: #f2f2f2;}
  
    #customers tr:hover {background-color: #ddd;}
  
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: rgb(42, 82, 192);
      color: white;
    }
    </style>
  </head>
  <body>
    <h1 class="center">Your order is on its way</h1>
    <div class="summary">
      <div class="summary-body">
        <div class="summary-list">
          <span class="summary-title">
            SUMMARY:
          </span>
          <div class="mt-30">Order ID: ${id}</div>
          <div>Order Date: ${new Date(createdAt).toDateString()}</div>
          <div>Order Total: ${total}</div>
        </div>
        <div class="summary-list">
          <span class="summary-title">
            SHIPPING ADDRESS:
          </span>
          <div class="mt-30">${deliveryAddress}</div>
        </div>
      </div>
    </div>
    <div class="summary">
      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        ${itemsRender(items)}
      </table>
    </div>
  </body>
  </html>`;
module.exports = render;
