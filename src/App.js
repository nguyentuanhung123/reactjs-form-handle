
import React, { useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import './App.css';
import SideBar from "./view/sidebarTest/SideBar.js";
import StudentList from './view/student/StudentList';
import TestCheck from "./view/checkAll/TestCheck";

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

  const [editStudent, setEditStudent] = useState("");

  const [formError, setFormError] = useState({})

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

  const validateForm = () => {
    let err = {}

    if (username === '') {
      err.username = 'Username required!'
    }
    if (email === '') {
      err.email = 'Email required!'
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(email)) {
        err.email = 'Email not validate'
      }
    }

    if (password === '' && cpassword === '') {
      err.password = 'Password and Confirm Password required!'
    } else {
      if (password !== cpassword) {
        err.password = 'Password not matched'
      } else {
        if (password.length < 6) {
          err.password = 'Password should greater than 6 characters!'
        }
      }
    }

    if (occupation === '') {
      err.occupation = 'Occupation required!'
    }
    if (gender === '') {
      err.gender = 'Gender required!'
    }
    if (languages.length < 1) {
      err.languages = 'Any one languages required!'
    }

    setFormError({ ...err })

    return Object.keys(err).length < 1;
    //true nếu không có lỗi trong mảng
    //false nếu có lỗi trong mảng
  }

  const onSubmitHandler = (e) => {

    //console.log(student)
    console.log(student);
    let isValid = validateForm();

    if (isValid) {

      fetch("http://localhost:3006/students", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(student)
      })
        .then((response) => {
          alert("Saved successfully.");
          navigate("/")
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
    else {
      alert('In Valid Form')
      e.preventDefault();
    }
  }

  const onUpdateHandler = (e) => {
    let isValid = validateForm();
    if (isValid) {

      fetch("http://localhost:3006/students/" + editStudent, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(student)
      })
        .then((response) => {
          alert("Saved successfully.");
          navigate("/");
          setEditStudent("")
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
    else {
      alert('In Valid Form')
      e.preventDefault();
    }
  }

  const handleDeleteItem = (id) => {
    if (window.confirm("Do you want to remove ?")) {
      fetch("http://localhost:3006/students/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          alert("Removed successfully. ");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
  }

  const handleEditItem = (id) => {
    //alert(id);
    fetch("http://localhost:3006/students/" + id).then((res) => {
      return res.json();
    }).then((response) => {
      setStudent(response);
      setEditStudent(response.id)
      //window.location.reload();
    }).catch((err) => {
      console.log(err.message);
    })
  }


  return (
    <div className="App">
      <div>App Header</div>
      <form>
        <div className='form-group'>
          <label htmlFor='username' className='form-label'>User Name</label>
          <input type="text" className='form-control' name='username' onChange={(e) => onChangeHandler(e)} value={username}></input>
          <span className="non-valid">{formError.username}</span>
        </div>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' className='form-control' name='email' onChange={(e) => onChangeHandler(e)} value={email}></input>
          <span className="non-valid">{formError.email}</span>
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' name='password' onChange={(e) => onChangeHandler(e)} value={password}></input>
          <span className="non-valid">{formError.password}</span>
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
          <span className="non-valid">{formError.occupation}</span>
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
          <span className="non-valid">{formError.gender}</span>
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
          <span className="non-valid">{formError.languages}</span>
        </div>
        {
          !editStudent && <div className='form-group'>
            <input className='btn' type="submit" value="Submit" onClick={(e) => onSubmitHandler(e)}></input>
          </div>
        }
        {
          editStudent && <div className='form-group'>
            <input className='btn' type="submit" value="Update" onClick={(e) => onUpdateHandler(e)}></input>
          </div>
        }
      </form>
      <StudentList
        students={students}
        handleDelete={handleDeleteItem}
        handleEdit={handleEditItem}
      />
      {/* <SideBar /> */}
      {/* <TestCheck /> */}
    </div>
  );
}

export default App;
