const CartItems = ({ data, onEmitDecreaseItem, onEmitIncreaseItem }) => {
  return (
    <div className="checkout-modal_list-item">
      <div className="img-wrap">
        <img
          src={`${data.thumbnail}`}
          className="img-fluidd"
          alt={data.title}
        />
      </div>
      <div className="information">
        <div>
          <h4>{data.title}</h4>
          <div className="pricing">
            <span>{data.discountedPrice}</span>
            <small>
              <strike>{data.price}</strike>
            </small>
          </div>
        </div>
        <div className="cart-addon cart-addon__modal">
          <button onClick={() => onEmitDecreaseItem(data)}>-</button>
          <span className="counter">{data.quantity}</span>
          <button onClick={() => onEmitIncreaseItem(data)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
