import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDesigns,
  selectDesignErrorState,
  selectDesigns,
  selectDesignStatusState,
} from "../redux/slices/designSlice";
import { Card } from "./Cards/DesignCard";
import { mockUpStyle as styling } from "../mockUpStyle.css";
import { mockUpdata as data } from "../mockUp";
import { PageContainer, PdfContainer } from "../components/PreviewPdf";
import CVCV from "../cvExample";
// import { Document } from "react-pdf";
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
// import { Page } from "react-pdf";

export const Designs = () => {
  const dispatch = useDispatch();

  const designs = useSelector(selectDesigns);
  const status = useSelector(selectDesignStatusState);
  const error = useSelector(selectDesignErrorState);

  useEffect(() => {
    dispatch(getDesigns);
  }, []);

  let content;
  if (status === "loading") {
    content = <div className="loader"></div>;
  } else if (status === "succeeded") {
    content = designs?.map((design, key) => <Card key={key} design={design} />);
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="Designs-container">
      <h1 style={{ textAlign: "center" }}>Our designs</h1>
      <div className="Designs-list">{content}</div>
      <div style={{ margin: "5rem" }}></div>

      {/* document */}
      
    </div>
  );
};
