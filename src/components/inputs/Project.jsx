import { useState } from "react";

export const ProjectInput = (props) => {
  const [projectList, setProjectList] = useState([
    {
      name: "",
      date: "",
      description: "",
    },
  ]);

  const handleProjectChange = (index, { name, date, description }) => {
    // const { value } = e.target;
    const list = [...projectList];
    name !== undefined
      ? (list[index].name = name)
      : description !== undefined
      ? (list[index].description = description)
      : date !== undefined
      ? (list[index].date = date)
      : "";
    setProjectList([...list]);
    props.handleProject([...list]);
  };
  const handleProjectRemove = (index) => {
    const list = [...projectList];
    list.splice(index, 1);
    setProjectList([...list]);
    props.handleProject([...list]);
  };
  const handleProjectAdd = () => {
    setProjectList([
      ...projectList,
      {
        name: "",
        date: "",
        description: [""],
      },
    ]);
    props.handleProject([
      ...projectList,
      {
        name: "",
        date: "",
        description: [""],
      },
    ]);
  };
  return (
    <div style={{ display: props.page !== 5 ? "none" : "flex" }}>
      {projectList.map((project, index) => (
        <div key={index} className="mb-1">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <label htmlFor="name">project name</label>
            <input
              required
              name="name"
              type="text"
              id="name"
              placeholder="Enter project name.."
              value={project.name}
              onChange={(e) => {
                handleProjectChange(index, { name: e.target.value });

                console.log({ projectList });
              }}
            />
            <label htmlFor="name">project date</label>
            <input
              required
              name="date"
              type="date"
              id="date"
              placeholder="Enter project date.."
              value={project.date}
              onChange={(e) => {
                handleProjectChange(index, { date: e.target.value });

                console.log({ projectList });
              }}
            />
            <label htmlFor="achivements"></label>
            <label htmlFor="description"></label>
            <textarea
              name="description"
              type="text"
              id="description"
              placeholder="Enter description.."
              value={project.description}
              onChange={(e) => {
                handleProjectChange(index, { description: e.target.value });
                console.log({ projectList });
              }}
              required
            />

            {projectList.length !== 1 && (
              <button
                type="button"
                onClick={() => handleProjectRemove(index)}
                className="remove-btn"
                project="error"
              >
                <span>Remove</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleProjectAdd}
              className="add-btn"
              project="success"
            >
              + Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
