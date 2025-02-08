import { useState } from "react";
import { Fragment } from "react";
import AddToCartIcon from "../../assets/add_cart.svg";
import Modal from "./UI/modal";
import { useDispatch, useSelector } from "react-redux";
import { addItemHandler, removeItemHandler } from "../../actions/action";

const ListItem = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const item = useSelector((state) =>
    state.Cart.items.find((item) => item.id === data.id)
  );
  const dispatch = useDispatch();

  const increaseCounterByOne = (event) => {
    event.stopPropagation();
    dispatch(addItemHandler(data));
  };

  const decreaseCounterByOne = (event) => {
    event.stopPropagation();
    dispatch(removeItemHandler(data.id));
  };

  const handleModal = () => {
    setShowModal((previousState) => !previousState);
  };

  return (
    <Fragment>
      <div onClick={handleModal} className="item-card">
        <img
          className="thumbnail"
          src={`${data.thumbnail}`}
          alt={data.title}
        ></img>
        <div className="item-card__information">
          <div className="pricing">
            <span>Rs.{data.discountedPrice}</span>
            <small>
              <strike>{data.price}</strike>
            </small>
          </div>
          <div className="title">
            <h3>{data.title}</h3>
          </div>
        </div>
        {!item || item?.quantity < 1 ? (
          <button className={"cart-add"} onClick={increaseCounterByOne}>
            <span>Add to Cart</span>
            <img src={AddToCartIcon} alt="Cart Icon"></img>
          </button>
        ) : (
          <div className="cart-addon">
            <button onClick={decreaseCounterByOne}>
              <span>-</span>
            </button>
            <span className={"counter"}>{item.quantity}</span>
            <button onClick={increaseCounterByOne}>
              <span>+</span>
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={handleModal}>
          <div className="item-card__modal">
            <div className="img-wrap">
              <img
                className="thumbnail2"
                src={`${data.thumbnail}`}
                alt={data.title}
              ></img>
            </div>
            <div className="meta">
              <h3>{data.title}</h3>
              <div className="pricing">
                <span>Rs.{data.discountedPrice}</span>
                <small>
                  <strike>{data.price}</strike>
                </small>
              </div>
              <p> {data.description}</p>

              {!item || item?.quantity < 1 ? (
                <button className={"cart-add"} onClick={increaseCounterByOne}>
                  <span>Add to Cart</span>
                  <img src={AddToCartIcon} alt="Cart Icon"></img>
                </button>
              ) : (
                <div className="cart-addon">
                  <button onClick={decreaseCounterByOne}>
                    <span>-</span>
                  </button>
                  <span className={"counter"}>{item.quantity}</span>
                  <button onClick={increaseCounterByOne}>
                    <span>+</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default ListItem;
