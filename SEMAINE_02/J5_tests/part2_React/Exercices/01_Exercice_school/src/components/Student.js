import React, { useState, useEffect } from "react";

const Detail = ({ student }) => {

  const { grade, notes } = student;

  const average = Math.round(10 * (notes.reduce((acc, curr) => acc + curr) / notes.length)) / 10;

  return (
    <ul className="detail-user" style={{ color: "#3388", listStyleType: "none" }}>
      <li>Niveau : {grade}</li>
      <li>Moyenne : { average}</li>
    </ul>
  )
}

const Student = props => {
  const { id, name, lastname, handleDetail, detail } = props;

  return (
    <div className="user">
      <p style={{ cursor: "pointer" }} onClick={() => handleDetail(id)}>Prénom : {name} Nom : {lastname}</p>
      {detail !== null && <Detail student={detail} />}
    </div>
  );
}

export default Student;