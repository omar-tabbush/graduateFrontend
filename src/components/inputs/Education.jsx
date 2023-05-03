import { useState } from "react";

export const EducationInput = (props) => {
  const [educationList, setEducationList] = useState([
    {
      field: "",
      degree: "",
      endDate: "",
      institution: "",
      location: "",
      startDate: "",
    },
  ]);

  const handleEducationChange = (
    index,
    { field, degree, endDate, institution, location, startDate }
  ) => {
    /* */
    const list = [...educationList];
    field !== undefined
      ? (list[index].field = field)
      : degree !== undefined
      ? (list[index].degree = degree)
      : startDate !== undefined
      ? (list[index].startDate = startDate)
      : endDate !== undefined
      ? (list[index].endDate = endDate)
      : location !== undefined
      ? (list[index].location = location)
      : institution !== undefined
      ? (list[index].institution = institution)
      : "";
    setEducationList([...list]);
  };
  const handleEducationRemove = (index) => {
    const list = [...educationList];
    list.splice(index, 1);
    setEducationList(list);
  };

  const handleEducationAdd = () => {
    setEducationList([
      ...educationList,
      {
        field: "",
        degree: "",
        endDate: "",
        institution: "",
        location: "",
        startDate: "",
      },
    ]);
  };
  return (
    <div style={{ display: props.page !== 4 ? "none" : "flex" }}>
      {educationList?.map((education, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label htmlFor="field">field</label>
          <input
            name="field"
            type="text"
            id="field"
            placeholder="Enter field name.."
            value={education?.field}
            onChange={(e) => {
              handleEducationChange(index, { field: e.target.value });
              props.handleEducation(educationList);
              console.log({ educationList });
            }}
            required
          />
          <label htmlFor="institution">institution name</label>
          <input
            name="institution"
            type="text"
            id="institution"
            placeholder="Enter institution name.."
            value={education?.institution}
            onChange={(e) => {
              handleEducationChange(index, { institution: e.target.value });
              props.handleEducation(educationList);
              console.log({ educationList });
            }}
            required
          />
          <label htmlFor="degree">degree</label>
          <input
            name="degree"
            type="text"
            id="degree"
            placeholder="Enter degree.."
            value={education?.degree}
            onChange={(e) => {
              handleEducationChange(index, { degree: e.target.value });
              props.handleEducation(educationList);
            }}
            required
          />
          <label htmlFor="location">location</label>

          <input
            name="location"
            type="text"
            id="location"
            placeholder="Enter location of institution.."
            value={education?.location}
            onChange={(e) => {
              handleEducationChange(index, { location: e.target.value });
              props.handleEducation(educationList);
              console.log({ educationList });
            }}
            required
          />
          <label htmlFor="startDate">start date</label>
          <input
            name="startDate"
            type="date"
            id="startDate"
            placeholder="Enter start date.."
            value={education?.startDate}
            onChange={(e) => {
              handleEducationChange(index, { startDate: e.target.value });
              props.handleEducation(educationList);
              console.log({ educationList });
            }}
            required
          />
          <label htmlFor="endDate">end date</label>

          <input
            name="endDate"
            type="date"
            id="endDate"
            placeholder="Enter end date.."
            value={education?.endDate}
            onChange={(e) => {
              handleEducationChange(index, { endDate: e.target.value });
              props.handleEducation(educationList);
              console.log({ educationList });
            }}
            required
          />
          {educationList.length !== 1 && (
            <button
              type="button"
              onClick={() => handleEducationRemove(index)}
              className="remove-btn"
            >
              <span>Remove</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleEducationAdd}
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
