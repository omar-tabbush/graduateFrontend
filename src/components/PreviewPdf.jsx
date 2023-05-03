import { Document, Page, PDFViewer, Text } from "@react-pdf/renderer";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styled from "styled-components";
import CVCV from "../cvExample";
import { mockUpdata } from "../mockUp";
import { mockUpStyle as styling } from "../mockUpStyle.css";

export const PdfContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin-inline: auto;
  @media screen and (max-width: 520px) {
    width: 260px;
    height: 366px;
    margin: auto;
  }
`;

export const PageContainer = styled.div`
  background-color: aliceblue;
  width: 2480px;
  height: 3508px;
`;
export const Doc = ({ data, styling }) => {
  return (
    <Document>
      <Page size="A4" pageNumber={1}>
        <CVCV data={data} styling={styling} />
      </Page>
    </Document>
  );
};
export const PreviewPdf = ({ data, styling }) => {
  return (
    <PDFViewer showToolbar={false} height={1000} width={"95%"}>
      <Doc data={data} styling={styling} />
    </PDFViewer>
  );
};

//to tomorrow
//1. enter the mockup data to the database
//2. test the api in the frontend
//3. make the CVCV component installable as pdf at submit the userData in Design.jsx
