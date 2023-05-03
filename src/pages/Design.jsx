import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockUpStyle as stylings } from "../mockUpStyle.css";
import { saveAs } from "file-saver";

import {
  EducationInput,
  LanguageInput,
  PersonalInfoInput,
  ProjectInput,
  TechnologyInput,
  WorkExperienceInput,
} from "../components/inputs";

import { Doc, PreviewPdf } from "../components/PreviewPdf";
import { useDispatch, useSelector } from "react-redux";
import {
  getDesign,
  selectDesign,
  selectDesignErrorState,
  selectDesignStatusState,
} from "../redux/slices/designSlice";
import { useEffect } from "react";
import { addUserData } from "../redux/slices/userDataSlice";
import { Can } from "../can";
import { pdf, PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { async } from "postcss-js";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export const Design = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fromDesign = useNavigate();

  const styling = useSelector(selectDesign);
  const status = useSelector(selectDesignStatusState);
  const error = useSelector(selectDesignErrorState);
  const [submitError, setSubmitError] = useState("");
  useEffect(() => {
    dispatch(getDesign(+id));
  }, []);
  const [page, setPage] = useState(1); //[1, 2, 3, 4, 5, 6]
  const [personal, setPersonal] = useState({
    fname: "",
    desc: "",
    specialization: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });
  const [work, setWork] = useState([
    {
      description: "",
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  ]);
  const [project, setProject] = useState([
    { name: "", date: "", description: "" },
  ]);
  const [tech, setTech] = useState([{ name: "" }]);
  const [education, setEducation] = useState([
    {
      field: "",
      degree: "",
      endDate: "",
      institution: "",
      location: "",
      startDate: "",
      description: "",
    },
  ]);
  const [language, setLanguage] = useState([{ name: "" }]);

  const handlePersonal = (data) => {
    setPersonal({ ...personal, ...data });
  };
  const handleWork = (data) => {
    setWork([...data]);
  };

  const handleTech = (data) => {
    setTech(data);
  };
  const handleEducation = (data) => {
    setEducation(data);
  };
  const handleProject = (data) => {
    setProject(data);
  };
  const handleLang = (data) => {
    setLanguage(data);
  };

  const handleSubmit = async () => {
    try {
      const id = +JSON.parse(localStorage.getItem("user")).userId;
      const data = {
        userId: id,
        ...personal,
        work,
        tech,
        education,
        project,
        language,
      };
      const blob = await pdf(
        <Doc
          data={{
            ...personal,
            work,
            tech,
            education,
            project,
            language,
          }}
          styling={styling}
        />
      ).toBlob();
      saveAs(blob, `${personal?.fname || "unknown"}.pdf`);
      dispatch(addUserData(data));
    } catch (e) {
      setSubmitError(e);
      return;
    }
    fromDesign("/home");
  };

  let content;
  if (status === "loading") {
    content = <div className="loader"></div>;
  } else if (status === "succeeded") {
    // updateInstance();
    content = (
      <PreviewPdf
        data={{
          ...personal,
          work,
          tech,
          education,
          project,
          language,
        }}
        styling={styling}
      />
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <>
      {" "}
      <h1 style={{ textAlign: "center" }}>{"design name"}</h1>
      <div className="Design-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="data"
        >
          <PersonalInfoInput
            handlePersonal={(data) => {
              handlePersonal(data);
              console.log(personal);
            }}
            page={page}
          />
          <WorkExperienceInput
            handleWork={(data) => {
              handleWork(data);
              console.log(work);
            }}
            page={page}
          />
          <TechnologyInput
            handleTech={(data) => {
              handleTech(data);
            }}
            page={page}
          />
          <EducationInput
            handleEducation={(data) => {
              handleEducation(data);
            }}
            page={page}
          />
          <ProjectInput
            handleProject={(data) => {
              handleProject(data);
            }}
            page={page}
          />
          <LanguageInput
            page={page}
            handleLanguage={(data) => {
              handleLang(data);
            }}
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
            {page !== 6 ? (
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
          <Can I="manage" a="ownUserData" passThrough>
            {(allowed) => (
              <>
                <button
                  style={{ margin: "0px !important", marginInline: "auto" }}
                  disabled={page === 6 && allowed ? false : true}
                  type="submit"
                >
                  submit
                </button>
              </>
            )}
          </Can>
          {submitError || ""}
        </form>
        {content}
      </div>
    </>
  );
};
