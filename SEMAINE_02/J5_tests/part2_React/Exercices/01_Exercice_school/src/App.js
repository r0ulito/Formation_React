import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './components/Message';
import Student from './components/Student';


const App = () => {
  const [students, setStudents] = useState(null);
  const [change, setChange] = useState(true);
  const [detail, setDetail] = useState(null);

  async function fetchStudents() {
    const response = await fetch(process.env.REACT_APP_STUDENTS);
    const json = await response.json();
    setStudents(json.students);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDetail = id => {
    const student = students.filter(student => student.id === id)[0];
    setDetail(student);
  }

  if (!students) return <p className="load">loading students...</p>;


  const nbStudent = students ? students.length : 0 ;

  return (
    <div className="App">
      <p><button className="btn-change" onClick={() => setChange(!change)}>Change message</button></p>
      {change ?
        <Message type="warning" content="Hello message Warning" /> :
        <Message type="danger" content="Hello message Danger" />
      }
      <h2>Liste des étudiants {nbStudent}</h2>
      {students.map((student, i) =>
        <Student
            handleDetail={handleDetail}
            key={i}
            { ...student }
            detail={detail && student.id === detail.id ? detail : null}
        />)}
    </div>
  );
}

export default App;