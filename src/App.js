
import React, { useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import './App.css';
import StudentList from './view/student/StudentList';

const App = () => {
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    id: Math.floor(Math.random() * 101),
    username: '',
    email: '',
    password: '',
    cpassword: '',
    occupation: '',
    gender: '',
    languages: []
  })

  const { id, username, email, password, cpassword, occupation, gender, languages } = student;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3006/students").then((res) => {
      return res.json();
    }).then((resp) => {
      setStudents(resp);
      //window.location.reload();
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

  const onChangeHandler = (e) => {
    if (e.target.name === 'languages') {
      let copy = { ...student }

      if (e.target.checked) {
        copy.languages.push(e.target.value);
      }
      else {
        copy.languages = copy.languages.filter((el) => el !== e.target.value)
      }

      setStudent(copy)
    }
    else {
      setStudent(() => (
        {
          ...student,
          [e.target.name]: e.target.value
        }
      ))
    }
  }

  const onSubmitHandler = () => {
    //console.log(student)
    fetch("http://localhost:3006/students", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(student)
    })
      .then((response) => {
        alert("Saved successfully.");
      })
      .catch((err) => {
        console.log(err.message);
      })
    console.log(student);
  }


  return (
    <div className="App">
      <div>App Header</div>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='username' className='form-label'>User Name</label>
          <input type="text" className='form-control' name='username' onChange={(e) => onChangeHandler(e)} value={username}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' className='form-control' name='email' onChange={(e) => onChangeHandler(e)} value={email}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' name='password' onChange={(e) => onChangeHandler(e)} value={password}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='cpassword' className='form-label'>Confirm Password</label>
          <input type='password' className='form-control' name='cpassword' onChange={(e) => onChangeHandler(e)} value={cpassword}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='occupation' className='form-label'>Occupation</label>
          <select className='form-select' name='occupation' onChange={(e) => onChangeHandler(e)} value={occupation}>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='gender' className='form-label'>Gender</label>
          <div className='flex'>
            <div>
              <input type="radio" name="gender" value="male" onChange={(e) => onChangeHandler(e)} checked={gender === 'male'}></input>
              <label htmlFor='male'>Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" onChange={(e) => onChangeHandler(e)} checked={gender === 'female'}></input>
              <label htmlFor='female'>Female</label>
            </div>
            <div>
              <input type="radio" name="gender" value="other" onChange={(e) => onChangeHandler(e)} checked={gender === 'other'}></input>
              <label htmlFor='male'>Other</label>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='languages' className='form-label'>Languages</label>
          <div className='flex'>
            <div>
              <input type="checkbox" name="languages" value="html" onChange={(e) => onChangeHandler(e)} checked={languages.includes('html')}></input>
              <label htmlFor='html'>HTML</label>
            </div>
            <div>
              <input type="checkbox" name="languages" value="css" onChange={(e) => onChangeHandler(e)} checked={languages.includes('css')}></input>
              <label htmlFor='css'>CSS</label>
            </div>
            <div>
              <input type="checkbox" name="languages" value="javascript" onChange={(e) => onChangeHandler(e)} checked={languages.includes('javascript')}></input>
              <label htmlFor='javascript'>Javascript</label>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <input className='btn' type="submit" value="Submit"></input>
        </div>
      </form>
      <StudentList students={students} />
    </div>
  );
}

export default App;
