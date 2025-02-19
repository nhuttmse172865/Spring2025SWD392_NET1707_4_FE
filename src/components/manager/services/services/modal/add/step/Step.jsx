import React, { useRef, useState } from "react";
import ICONS from "../../../../../../../constants/icons";

const Step = ({ setSteps }) => {
  const [listStep, setListStep] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const handleAddStep = () => {
    const step = {
      name: name,
      description: description,
    };
    let _steps = [...listStep, step];
    setListStep(_steps);
    setName("");
    setDescription("");
    setSteps(_steps);
  };

  const dragItem = useRef(null);

  const handleDragStart = (event, index) => {
    dragItem.current = index;
    event.dataTransfer.setData("listIndex", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const droppedIndex = event.dataTransfer.getData("listIndex");
    let steps = [...listStep];
    let item = steps[droppedIndex];
    steps.splice(droppedIndex, 1);
    steps.splice(index, 0, item);
    setListStep(steps);
    setSteps(steps);
  };

  return (
    <div className="relative">
      <div className="h-[30px]  rounded-[.375rem] flex items-center gap-5 px-2">
        <span className="text-[15px] font-medium text-[rgba(0,0,0,0.6)] w-[10%]">
          No.
        </span>
        <span className="w-[80%] font-medium text-[15px] text-[rgba(0,0,0,0.6)]">
          Name
        </span>
      </div>

      {listStep &&
        listStep.map((item, index) => (
          <>
            <div
              className="h-[40px]  rounded-[.375rem] flex items-center gap-5 bg-[rgba(0,0,0,0.05)] px-2 cursor-pointer"
              draggable="true"
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
            >
              <span className="text-[15px] text-[rgba(0,0,0,0.5)] w-[10%]">
                {index + 1}
              </span>
              <span className="w-[80%] text-[15px] text-[rgba(0,0,0,0.5)]">
                {item.name}
              </span>
              <div>
                <img src={ICONS.delete} />
              </div>
            </div>
            <div
              className="h-[10px] "
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={handleDragOver}
            ></div>
          </>
        ))}
      <div className="h-[40px]  rounded-[.375rem] flex items-center gap-5 mt-2">
        <span className="text-[15px] text-[rgba(0,0,0,0.5)] w-[10%]"></span>
        <input
          type="text"
          style={{
            width: "80%",
            height: "40px",
            fontSize: "14px",
            color: "rgba(0,0,0,0.6)",
          }}
          placeholder="Step 1..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div
        className="bg-[rgba(0,0,0,0.05)] w-[50%] relative left-[50%] mt-2.5 h-[35px] rounded-[.375rem] cursor-pointer"
        style={{
          transform: "translateX(-50%)",
        }}
        onClick={() => handleAddStep()}
      >
        <img
          src={ICONS.add}
          className="h-[100%] relative"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default Step;
