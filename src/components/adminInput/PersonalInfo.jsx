import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useEffect } from "react";

export const PersonalInfoInput = (props) => {
  useEffect(() => {
    if (props.personal) setData(props.personal);
  }, [props.personal]);
  const [data, setData] = useState({
    NAME: "",
    head: "",
    info: "",
    full_name: "",
    specialization: "",
    desc: "",
    links: "",
    link: "",
  });
  const codeEditStyle = {
    fontSize: "1rem",
    background: "#EDF2F7",
    color: "#728095",
    height: "5rem",
    border: "2px solid #532C59",
    borderRadius: "5px",

    "&focus": {
      outline: "none",
      border: "2px solid #E36CE6 !important",
    },
  };
  return (
    <div style={{ display: props.page !== 1 ? "none" : "flex" }}>
      <label htmlFor="head">css style for head (cv child) </label>
      <CodeEditor
        style={codeEditStyle}
        language="css"
        required
        placeholder="enter head styling..&#10;for example : background: darkblue;&#10;display:flex;"
        name="head"
        id="head"
        value={data?.head}
        onChange={(e) => {
          let x = e.target.value;
          x.replace("\n", "");
          setData({ ...data, [e.target.name]: x });
          props.handlePersonal({ [e.target.name]: x });
        }}
      />
      <div className="firstParent">
        <label htmlFor="info">
          css style for (full name, specialization)'s parent{" "}
        </label>
        <CodeEditor
          style={codeEditStyle}
          language="css"
          required
          type="text"
          placeholder="enter parent styling..&#10;for example : background: darkblue;&#10;display:flex;"
          name="info"
          id="info"
          value={data?.info}
          onChange={(e) => {
            let x = e.target.value;
            x.replace("\n", "");
            setData({ ...data, info: x });
            props.handlePersonal({ [e.target.name]: x });
          }}
        />
        <div className="secondParent">
          <label htmlFor="full_name">Full name</label>
          <CodeEditor
            style={codeEditStyle}
            language="css"
            required
            type="text"
            placeholder="full name styling..&#10;for example : background: darkblue;&#10;display:flex;"
            name="full_name"
            id="full_name"
            value={data?.full_name}
            onChange={(e) => {
              let x = e.target.value;
              x.replace("\n", "");
              setData({ ...data, full_name: x });
              props.handlePersonal({ [e.target.name]: x });
              console.log({ data });
            }}
          />

          <label htmlFor="specialization">Specialization css styling</label>
          <CodeEditor
            style={codeEditStyle}
            language="css"
            required
            type="text"
            id="specialization"
            name="specialization"
            placeholder="enter specialization css styling..&#10;for example : background: darkblue;&#10;display:flex;"
            value={data?.specialization}
            onChange={(e) => {
              let x = e.target.value;
              x.replace("\n", "");
              setData({ ...data, specialization: x });
              props.handlePersonal({ [e.target.name]: x });
            }}
          />
          <label htmlFor="desc">description css styling</label>
          <CodeEditor
            style={codeEditStyle}
            language="css"
            placeholder="enter description styling"
            id="desc"
            name="desc"
            value={data?.desc}
            onChange={(e) => {
              let x = e.target.value;
              x.replace("\n", "");
              setData({ ...data, desc: x });
              props.handlePersonal({ [e.target.name]: x });
            }}
          />
        </div>
        <label htmlFor="links">css style for Links's parent </label>
        <CodeEditor
          style={codeEditStyle}
          language="css"
          required
          type="text"
          placeholder="enter parent styling..&#10;for example : background: darkblue;&#10;display:flex;"
          name="links"
          id="links"
          value={data?.links}
          onChange={(e) => {
            let x = e.target.value;
            x.replace("\n", "");
            setData({ ...data, links: x });
            props.handlePersonal({ [e.target.name]: x });

            console.log({ data });
          }}
        />
        <div className="secondParent">
          <label htmlFor="link">Singlelink css styling</label>
          <CodeEditor
            style={codeEditStyle}
            language="css"
            required
            type="text"
            id="link"
            name="link"
            placeholder="enter link style..&#10;for example : background: darkblue;&#10;display:flex;"
            value={data?.link}
            onChange={(e) => {
              let x = e.target.value;
              x.replace("\n", "");
              setData({ ...data, link: x });
              props.handlePersonal({ [e.target.name]: x });
            }}
          />
        </div>
      </div>
    </div>
  );
};
