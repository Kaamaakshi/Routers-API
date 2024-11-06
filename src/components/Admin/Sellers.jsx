import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./../common/Loader";

const Sellers = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [seller, setSeller] = useState([]);
  useEffect(() => {
    // fetchSeller();
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setSeller(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(err.message);
      });
  }, []);

  //   const fetchSeller = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await axios.get(
  //         "https://jsonplaceholder.typicode.com/userrs"
  //       );
  //       setSeller(res.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       setErrors(err.message);
  //     }
  //   };
  const addSeller = () => {
    const newseller = {
      name,
      id: seller.length + 1,
    };
    setSeller([newseller, ...seller]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newseller)
      .then((res) => setSeller([res.data, ...seller]))
      .catch((err) => {
        setErrors(err.message);
        setSeller(seller);
      });
  };
  const deleteSeller = (id) => {
    setSeller(seller.filter((s) => s.id !== id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .catch((err) => {
        setErrors(err.message);
        setSeller(seller);
      });
  };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input type="text" onChange={(e) => setName(e.target.value)}></input>
      <button onClick={addSeller}>Add Seller</button>
      {isLoading && <Loader />}
      {errors && <em>{errors}</em>}
      <table>
        <tbody>
          {seller.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.name}</td>
              <td>
                <button onClick={() => deleteSeller(seller.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;
