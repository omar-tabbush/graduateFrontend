import { useState } from "react";

export const WorkExperienceInput = (props) => {
  const [workList, setWorkList] = useState([
    {
      description: "",
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  ]);

  const handleWorkChange = (
    index,
    { title, company, startDate, endDate, location, description }
  ) => {
    // const { value } = e.target;
    const list = [...workList];
    title !== undefined
      ? (list[index].title = title)
      : description !== undefined
      ? (list[index].description = description)
      : company !== undefined
      ? (list[index].company = company)
      : startDate !== undefined
      ? (list[index].startDate = startDate)
      : endDate !== undefined
      ? (list[index].endDate = endDate)
      : location !== undefined
      ? (list[index].location = location)
      : "";
    setWorkList([...list]);
  };
  const handleWorkRemove = (index) => {
    const list = [...workList];
    list.splice(index, 1);
    setWorkList([...list]);
  };

  const handleWorkAdd = () => {
    setWorkList([
      ...workList,
      {
        description: "",
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        location: "",
      },
    ]);
    console.log({ workList });
  };
  return (
    <div style={{ display: props.page !== 2 ? "none" : "flex" }}>
      <label htmlFor="work">work experiences </label>
      {workList.map((work, index) => (
        <div key={index}>
          <div
            id="work"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <label htmlFor="title">work title</label>
            <input
              name="title"
              type="text"
              id="title"
              placeholder="Enter work title.."
              value={work.title}
              onChange={(e) => {
                handleWorkChange(index, { title: e.target.value });
                props.handleWork(workList);
                console.log({ workList });
              }}
            />
            <label htmlFor="company"></label>
            <input
              name="company"
              type="text"
              id="company"
              placeholder="Enter company name.."
              value={work.company}
              onChange={(e) => {
                handleWorkChange(index, { company: e.target.value });
                props.handleWork(workList);
                console.log({ workList });
              }}
              required
            />
            <label htmlFor="startDate">start date</label>
            <input
              name="startDate"
              type="date"
              id="startDate"
              placeholder="Enter date start.."
              value={work.startDate}
              onChange={(e) => {
                {
                  handleWorkChange(index, { startDate: e.target.value });
                  props.handleWork(workList);
                  console.log({ workList });
                }
              }}
              required
            />
            <label htmlFor="endDate">end date</label>
            <input
              name="endDate"
              type="date"
              id="endDate"
              placeholder="Enter date end.."
              value={work.endDate}
              onChange={(e) => {
                {
                  handleWorkChange(index, { endDate: e.target.value });
                  props.handleWork(workList);
                  console.log({ workList });
                }
              }}
              required
            />

            <label htmlFor="location"></label>
            <input
              name="location"
              type="text"
              id="location"
              placeholder="Enter location.."
              value={work.location}
              onChange={(e) => {
                handleWorkChange(index, { location: e.target.value });
                props.handleWork(workList);
                console.log({ workList });
              }}
              required
            />

            <label htmlFor="description"></label>
            <textarea
              name="description"
              type="text"
              id="description"
              placeholder="Enter description.."
              value={work.description}
              onChange={(e) => {
                handleWorkChange(index, { description: e.target.value });
                props.handleWork(workList);
                console.log({ workList });
              }}
              required
            />

            {workList.length !== 1 && (
              <button
                type="button"
                onClick={() => {
                  handleWorkRemove(index);
                  props.handleWork(workList);
                  console.log({ workList });
                }}
                className="remove-btn"
              >
                <span>Remove</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleWorkAdd}
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
