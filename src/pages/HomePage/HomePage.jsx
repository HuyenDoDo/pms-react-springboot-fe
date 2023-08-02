import React, {
  useEffect,
  // useState
} from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   increment,
//   decrement,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from "../../redux/CounterSlice";

const HomePage = () => {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState(2);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(incrementByAmount(incrementAmount));
  // };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PMS";
  }, []);

  return (
    <div>
      <h1 className="text-center">Welcome to Post Management System</h1>
      {/* <div className="text-center">
        <h2>Count: {count}</h2>
        <Button
          variant="primary"
          className="p-3 m-1"
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </Button>
        <Button
          variant="secondary"
          className="p-3 m-1"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </Button>
        <form
          className="d-flex flex-column row justify-content-center align-items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="col-6">
            <input
              className="form-control m-3"
              type="number"
              onChange={(e) => setIncrementAmount(+e.target.value)}
              value={incrementAmount}
            />
            <Button type="submit" variant="primary" className="me-1">
              Increment By Amount
            </Button>
            <Button
              onClick={() => {
                dispatch(incrementAsync(incrementAmount));
              }}
            >
              Increment Async
            </Button>
          </div>
        </form>
      </div> */}
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <div
          className="m-2 p-1 m-lg-5 border border-2 border-secondary rounded-3 text-center flex-wrap"
          style={{ width: "300px", cursor: "pointer" }}
          onClick={() => navigate("/posts")}
        >
          <i className="bi bi-postcard" style={{ fontSize: "70px" }}></i>
          <h2>Post Management System</h2>
        </div>
        <div
          className="m-2 p-1 m-lg-5 border border-2 border-secondary rounded-3 text-center"
          style={{ width: "300px", cursor: "pointer" }}
          onClick={() => navigate("/tags")}
        >
          <i className="bi bi-bookmarks" style={{ fontSize: "70px" }}></i>
          <h2>Tag Management System</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
