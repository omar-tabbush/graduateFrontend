import { useState } from "react";

export const LanguageInput = (props) => {
  const [languageList, setLanguageList] = useState([{ name: "" }]);

  const handleLanguageChange = (e, index) => {
    const { value } = e.target;
    const list = [...languageList];
    list[index].name = value;
    setLanguageList(list);
    props.handleLanguage(list);
  };
  const handleLanguageRemove = (index) => {
    const list = [...languageList];
    list.splice(index, 1);
    setLanguageList(list);
    props.handleLanguage(list);
  };

  const handleLanguageAdd = () => {
    setLanguageList([...languageList, {name:""}]);
    props.handleLanguage([...languageList, {name:""}]);
  };
  return (
    <div style={{ display: props.page !== 6 ? "none" : "flex" }}>
      <label htmlFor="work">language </label>
      {languageList.map((language, index) => (
        <div key={index} className="mb-1">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <input
              name="language"
              type="text"
              id="work"
              placeholder="Enter language name.."
              value={language?.name}
              onChange={(e) => handleLanguageChange(e, index)}
              required
            />

            {languageList?.length !== 1 && (
              <button
                type="button"
                onClick={() => handleLanguageRemove(index)}
                className="remove-btn"
              >
                <span>Remove</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleLanguageAdd}
              className="add-btn"
              work="success"
            >
              + Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
