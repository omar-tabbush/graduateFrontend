import { useState } from "react";

export const TechnologyInput = (props) => {
  const [techList, setTechList] = useState([{name:""}]);

  const handleTechChange = (e, index) => {
    const { value } = e.target;
    const list = [...techList];
    list[index].name = value;
    setTechList(list);
    props.handleTech(list);
  };
  const handleTechRemove = (index) => {
    const list = [...techList];
    list.splice(index, 1);
    setTechList(list);
    props.handleTech(list);
  };

  const handleTechAdd = () => {
    setTechList([...techList, {name:""}]);
    props.handleTech(techList);

  };
  return (
    <div style={{ display: props.page !== 3 ? "none" : "flex" }}>
      <label htmlFor="work">Technologies </label>
      {techList.map((tech, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <input
            name="work"
            type="text"
            id="work"
            placeholder="Enter work name.."
            value={techList[index]?.name}
            onChange={(e) => {
              handleTechChange(e, index);
              console.log({ techList });
            }}
            required
          />

          {techList.length !== 1 && (
            <button
              type="button"
              onClick={() => {
                handleTechRemove(index);
              }}
              className="remove-btn"
            >
              <span>Remove</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleTechAdd}
            className="add-btn"
            work="success"
          >
            + Add
          </button>
        </div>
      ))}
    </div>
  );
};
