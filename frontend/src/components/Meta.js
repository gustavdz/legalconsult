import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, keywords, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcomme to LegalConsulting",
  keywords: "Legal, Consultas, Leyes, Abogados, Asesoría, Sistema",
  description: "Consultas legales",
};
export default Meta;
