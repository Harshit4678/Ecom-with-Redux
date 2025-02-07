import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../../actions/orderActions";
import "../../../styles/OrderHistory.scss";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.orders.history) || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchOrderHistory(() => setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    console.log("Order history from Redux state:", orderHistory);
  }, [orderHistory]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-history-container">
      <h2>Your Orders</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orderHistory.map((order) => (
            <li key={order.id} className="order-item">
              <h3>Order ID: {order.id}</h3>
              <p>
                Date:{" "}
                {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
              </p>
              <p>Total Amount: Rs.{order.totalAmount || "N/A"}</p>
              <ul className="item-list">
                {order.items &&
                  order.items.map((item) => (
                    <li key={item.id} className="item">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="item-thumbnail"
                      />
                      <div className="item-details">
                        <h4>{item.title}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs.{item.price}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
