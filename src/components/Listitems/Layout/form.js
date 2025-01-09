const Form = (props) => {
  const handleInput = (e) => {
    props.onChangeInput(e);
  };

  return (
    <div className="form">
      <form onSubmit={props.onFormSubmission}>
        <h2>Item Card Details</h2>
        <div className={"input-field"}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter Title"
            value={props.item.title}
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className={"input-field"}>
          <label htmlFor="title">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter Price"
            value={props.item.price}
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className={"input-field"}>
          <label htmlFor="discountedPrice">Discount Price</label>
          <input
            name="discountedPrice"
            type="number"
            placeholder="Enter Discounted Price"
            value={props.item.discountedPrice}
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className={"input-field"}>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            name="thumbnail"
            type="text"
            placeholder="Enter Thumbnail name"
            value={props.item.thumbnail}
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className="submit-wrap">
          <button>Update</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
