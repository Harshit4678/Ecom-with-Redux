import Modal from "./modal";

const OrderSuccessModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="order-container">
        <div className="order-container--success">
          <img
            src="https://www.sendx.io/hubfs/Email-Messages-for-Order-Confirmation-Page-v3.png"
            alt="Order Successfully"
            className="img-fluidd"
          ></img>
          <div className="message">
            <h1>Order Successfully Placed ! </h1>
            <span>OrderID #{Math.random().toString(32).slice(2)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
