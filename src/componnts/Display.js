import React, { useState } from "react";
import { observable, autorun } from "mobx";
import data from "../data/file";
import { observer, Observer } from "mobx-react";

const Display = () => {
  const [isNew, setIsNew] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  var mobxusers = observable(data);

  const setDefaultValues = () => {
    setIsNew(true);
    setName("");
    setAge("");
    setEmail("");
    setGender("");
    setPhone("");
  };

  const deleteUser = (index) => {
    mobxusers.splice(index, 1);
  };

  const displayProfile = (index) => {
    setIsNew(false);
    setCurrentIndex(index)
    setName(mobxusers[index].name);
    setAge(mobxusers[index].age);
    setEmail(mobxusers[index].email);
    setGender(mobxusers[index].gender);
    setPhone(mobxusers[index].phone);
  }

  const addOrUpdate = () => {
    if (isNew) {
      mobxusers.push({
        name,
        age,
        email,
        gender,
        phone
      })
     // setDefaultValues();
    } else {
      
     let tempname = name;
     // mobxusers[currentIndex] = obj;
       mobxusers[currentIndex].name = tempname;
     /* mobxusers[currentIndex].age = age;
      mobxusers[currentIndex].email = email;
      mobxusers[currentIndex].gender = gender;
      mobxusers[currentIndex].phone = phone; */
     setDefaultValues();

    }

  }


  return (
    <>
      <button
        onClick={() => {
          setDefaultValues();
        }}
      >
        Ad User
      </button>
      <div className="container">
        <div className="row">
          <div className="col-md-8">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th></th>

                </tr>
              </thead>
              <tbody>
                <Observer>
                  {() =>
                    mobxusers.map((user, index) => (
                      <tr key={user.email} >
                        <td style={{ cursor: 'pointer' }} onClick={() => displayProfile(index)} > {user.name} </td>
                        <td> {user.age} </td>
                        <td> {user.email} </td>
                        <td> {user.gender} </td>
                        <td> {user.phone} </td>
                        <td>
                          {" "}
                          <button onClick={() => deleteUser(index)}>Delete</button>{" "}
                        </td>
                      </tr>
                    ))
                  }
                </Observer>
              </tbody>
            </table>

          </div>
          <div className="col-md-4">
                    <h3 style = {{marginLeft:'20px'}} > { isNew ? "Add New User" : "Update User"} </h3>
            <form id="needs-validation" onSubmit={(e) => {e.preventDefault(); addOrUpdate()}} className="rounded mx-auto d-block shadow p-3 mb-5 bg-light">
              <div className="row">
                <div className="form-group col-md-12">
                  <label htmlFor="inlineFormInputGroup">Name</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    </div>
                    <input className="form-control" value={name} onChange={(e) => { setName(e.currentTarget.value) }} placeholder="Name" type="text" required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Age</label>
                  <input type="text" className="form-control" value={age} onChange={(e) => { setAge(e.currentTarget.value) }} placeholder="Age" required />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} placeholder="Email" required />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Gender</label>
                  <input type="text" className="form-control" placeholder="Gender" value={gender} onChange={(e) => { setGender(e.currentTarget.value) }} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Phone</label>
                  <input type="text" className="form-control" placeholder="Phone" value={phone} onChange={(e) => { setPhone(e.currentTarget.value) }} />
                </div>
              </div>
              <button type="submit"  className="btn mx-auto d-block  btn-primary"> {isNew ? "Add" : "Update"}</button>
            </form>


          </div>
        </div>

      </div>

    </>
  );
};

export default observer(Display);
