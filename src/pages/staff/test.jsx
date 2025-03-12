import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE from "../../constants/base";

const Test = () => {
  const [typeQuestion, setTypeQuestion] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); 
  const [quizQuestions, setQuizQuestions] = useState([]);
  useEffect(() => {
    fetchTypeQuestion();
    
  }, []);
  const feactchQuestion = async () => {
try {
    let allQuestions = [];
    for (const id of selectedItems) {
        const res = await axios.get(`${BASE.BASE_URL}/quiz/getQuizByTypeQuestion/${id}`);
        allQuestions = [...allQuestions, ...res.data.data]; }
   
      console.log(allQuestions);
     
} catch (error) {
    console.log(error)
}  
}
  const fetchTypeQuestion = async () => {
    try {
      const res = await axios.get(`${BASE.BASE_URL}/type-question/get-all`);
      setTypeQuestion(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Hàm xử lý chọn/bỏ chọn hàng
  const handleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id) // Bỏ chọn nếu đã chọn
        : [...prevSelected, id] // Thêm vào danh sách nếu chưa chọn
    );
  };

  return (
    <div className="test">
      <h2>List of Type Questions</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {typeQuestion.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleSelect(item.id)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={feactchQuestion} disabled={selectedItems.length === 0}>
        Show Questions
      </button>

      {/* Hiển thị danh sách đã chọn */}
      <h3>Selected Items: {selectedItems.join(", ")}</h3>
    </div>
  );
};

export default Test;
