import { useState } from "react";
import { mockUpdata } from "../../mockUp";
import { PersonalInfoInput } from "../../components/adminInput";

import { PreviewPdf } from "../../components/PreviewPdf";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useDispatch, useSelector } from "react-redux";
import {
  addDesign,
  getDesign,
  selectDesign,
  updateDesign,
} from "../../redux/slices/designSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const EditDesignAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oldDesign = useSelector(selectDesign);

  useEffect(() => {
    dispatch(getDesign(+id));
  }, []);

  const [personal, setPersonal] = useState({
    head: "",
    info: "",
    full_name: "",
    specialization: "",
    desc: "",
    links: "",
    link: "",
  });

  const [styledata, setStyledata] = useState({
    NAME: "",
    cv: "",
    body: "",
    section: "",
    section_title: "",
    section_subtitle: "",
    section_subtitle2: "",
    section_date: "",
    section_location: "",
    section_list_title: "",
    section_list_item: "",
  });

  const [page, setPage] = useState(1); //[1, 2, 3, 4, 5, 6]

  const handlePersonal = (data) => {
    setPersonal({ ...personal, ...data });
  };

  const fromEditDesign = useNavigate();

  useEffect(() => {
    setStyledata({
      NAME: oldDesign?.NAME,
      cv: oldDesign?.cv,
      body: oldDesign?.body,
      section: oldDesign?.section,
      section_title: oldDesign?.section_title,
      section_subtitle: oldDesign?.section_subtitle,
      section_subtitle2: oldDesign?.section_subtitle2,
      section_date: oldDesign?.section_date,
      section_location: oldDesign?.section_location,
      section_list_title: oldDesign?.section_list_title,
      section_list_item: oldDesign?.section_list_item,
    });
    setPersonal({
      head: oldDesign?.head,
      info: oldDesign?.info,
      full_name: oldDesign?.full_name,
      specialization: oldDesign?.specialization,
      desc: oldDesign?.desc,
      links: oldDesign?.links,
      link: oldDesign?.link,
    });
  }, [oldDesign]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDesign({ id: id, design: { ...personal, ...styledata } }));
    setPersonal({
      head: "",
      info: "",
      full_name: "",
      specialization: "",
      links: "",
      link: "",
    });
    setStyledata({
      NAME: "",
      cv: "",
      body: "",
      section: "",
      section_title: "",
      section_subtitle: "",
      section_subtitle2: "",
      section_date: "",
      section_location: "",
      section_list_title: "",
      section_list_item: "",
    });
    fromEditDesign('/dashboard/design');
  };
  const codeEditStyle = {
    fontSize: "1rem",
    background: "#EDF2F7",
    color: "#728095",
    height: "5rem",
    border: "2px solid #532C59",
    borderRadius: "5px",

    "&:focus": {
      outline: "none",
      border: "2px solid #E36CE6 !important",
    },
  };

  return (
    <>
      {" "}
      <h1 style={{ textAlign: "center", padding: "1.5rem" }}>
        {"design name"}
      </h1>
      <div className="Design-container">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="data-admin"
        >
          <div style={page !== 1 ? { display: "none" } : {}}>
            <label htmlFor="NAME">a title for your desin</label>
            <input
              required
              type="text"
              name="NAME"
              id="NAME"
              placeholder="name of the design"
              value={styledata?.NAME}
              onChange={(e) => {
                setStyledata({ ...styledata, [e.target.name]: e.target.value });
              }}
            />
            <label htmlFor="cv">css styling for whole CV</label>
            <CodeEditor
              style={codeEditStyle}
              language="css"
              name="cv"
              id="cv"
              placeholder="Enter cv style..&#10;for example : background: darkblue;&#10;display:flex;"
              value={styledata?.cv}
              onChange={(e) => {
                let x = e.target.value;
                x.replace("\n", "");
                setStyledata({ ...styledata, cv: x });
                console.log(x);
                // props.handleTech(data);
              }}
              required
            />
          </div>
          <div style={page !== 2 ? { display: "none" } : {}}>
            <label htmlFor="body">css style for body </label>
            <CodeEditor
              style={codeEditStyle}
              language="css"
              required
              type="text"
              placeholder="enter body styling..&#10;for example : background: darkblue;&#10;display:flex;"
              name="body"
              id="body"
              value={styledata?.body}
              onChange={(e) => {
                let x = e.target.value;
                x.replace("\n", "");

                setStyledata({ ...styledata, body: x });
              }}
            />
            <div className="firstParent">
              <label htmlFor="section">
                css style for body's children(sections){" "}
              </label>
              <CodeEditor
                style={codeEditStyle}
                language="css"
                name="section"
                id="section"
                placeholder="Enter section style..&#10;for example : background: darkblue;&#10;display:flex;"
                value={styledata?.section}
                onChange={(e) => {
                  let x = e.target.value;
                  x.replace("\n", "");
                  setStyledata({ ...styledata, section: x });
                }}
                required
              />
              <div className="secondParent">
                <label htmlFor="section_title">
                  css style for sections's section_title{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_title"
                  id="section_title"
                  placeholder="Enter section_title style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_title}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_title: x });
                  }}
                  required
                />
                <label htmlFor="section_subtitle">
                  css style for sections's sub-section_title{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_subtitle"
                  id="section_subtitle"
                  placeholder="Enter section_subtitle style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_subtitle}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_subtitle: x });
                  }}
                  required
                />

                <label htmlFor="section_subtitle2">
                  css style for sections's sub-section_title 2{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_subtitle2"
                  id="section_subtitle2"
                  placeholder="Enter section_subtitle style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_subtitle2}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_subtitle2: x });
                  }}
                  required
                />
                <label htmlFor="section_date">
                  css style for sections's section_date{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_date"
                  id="section_date"
                  placeholder="Enter section_date style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_date}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_date: x });
                  }}
                  required
                />
                <label htmlFor="section_location">
                  css style for sections's section_location{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_location"
                  id="section_location"
                  placeholder="Enter section_location style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_location}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_location: x });
                  }}
                  required
                />

                <label htmlFor="section_list_title">
                  css style for sections's list-section_title{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_list_title"
                  id="section_list_title"
                  placeholder="Enter section_list_title style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_list_title}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_list_title: x });
                  }}
                  required
                />
                <label htmlFor="section_list_item">
                  css style for sections's list-item{" "}
                </label>
                <CodeEditor
                  style={codeEditStyle}
                  language="css"
                  name="section_list_item"
                  id="section_list_item"
                  placeholder="Enter section_list_item style..&#10;for example : background: darkblue;&#10;display:flex;"
                  value={styledata?.section_list_item}
                  onChange={(e) => {
                    let x = e.target.value;
                    x.replace("\n", "");
                    setStyledata({ ...styledata, section_list_item: x });
                  }}
                  required
                />
              </div>
            </div>
          </div>
          <div style={page !== 3 ? { display: "none" } : {}}></div>
          <PersonalInfoInput
            personal={personal}
            handlePersonal={(data) => {
              handlePersonal(data);
            }}
            page={page}
          />

          <div style={{ display: "flex", flexDirection: "row" }}>
            {page !== 1 ? (
              <button
                type="button"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                prev
              </button>
            ) : (
              ""
            )}
            {page !== 2 ? (
              <button
                type="button"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                next
              </button>
            ) : (
              ""
            )}
          </div>
          <button
            style={{ margin: "0px !important", marginInline: "auto" }}
            disabled={page === 2 ? false : true}
            type="submit"
          >
            submit
          </button>
        </form>
        <PreviewPdf data={mockUpdata} styling={{ ...personal, ...styledata }} />
      </div>
    </>
  );
};
