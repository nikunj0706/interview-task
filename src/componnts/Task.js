import React, { useState } from "react";
import { observable, autorun } from "mobx";
import data from "../data/file";
import { observer, Observer } from "mobx-react";

const Task = () => {
    const [mobxusers, setMobXUsers] = useState(observable(data))
    const [isNew, setIsNew] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [phone, setPhone] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [list, setList] = useState([]);

    const setDefaultValues = () => {
        setIsNew(true);
        setName("");
        setAge("");
        setEmail("");
        setGender("male");
        setPhone("");
    };

    const deleteMultiple = () => {
        if (list.length === 0) {
            alert("Please select one or more checkboxes for delete");
            return;
        }
        let temp = [...mobxusers];
        list.forEach(email => {
            let one = temp.findIndex(el => el.email === email);
            temp.splice(one, 1);
        });
        setMobXUsers(temp);
        setList([]);
        setDefaultValues();
    }

    const manageDeleteList = (email, isTrue) => {

        setIsSelected(isTrue);
        let temp = [...list];
        if (isTrue) {
            temp.push(email);
            setList(temp);
        } else {
            let one = temp.findIndex((el) => el === email);
            temp.splice(one, 1);
            setList(temp);
        }

    }

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
        let one = mobxusers.findIndex(el => el.email.toLowerCase() === email.toLowerCase());
        if (isNew) {
            if (one >= 0) {
                alert("Email already registered");
                return;
            }
            setMobXUsers(prev => {
                prev.push({
                    name,
                    age,
                    email,
                    gender,
                    phone
                })
                return prev;
            });
            setDefaultValues();
        } else {
            if (one >= 0 && one !== currentIndex) {
                alert("Email already registered");
                return;
            }
            mobxusers[currentIndex].name = name;
            mobxusers[currentIndex].age = age;
            mobxusers[currentIndex].email = email;
            mobxusers[currentIndex].gender = gender;
            mobxusers[currentIndex].phone = phone;
            setDefaultValues();
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div style={{ margin: '25x 0' }} >
                            <button
                                onClick={() => {
                                    setDefaultValues();
                                }}
                            >
                                Add New User
                             </button>
                            <button style={{ marginLeft: '20px' }} onClick={() => { deleteMultiple() }} >Delete Users</button>
                        </div>
                        <table style={{ marginTop: '20px' }} className="table table-striped">
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
                                                    <input type="checkbox" value={isSelected} onChange={(e) => { manageDeleteList(user.email, e.currentTarget.checked) }} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </Observer>
                            </tbody>
                        </table>

                    </div>
                    <div className="col-md-4">
                        <h3 style={{ marginLeft: '20px' }} > {isNew ? "Add New User" : "Update User"} </h3>
                        <form id="needs-validation" onSubmit={(e) => { e.preventDefault(); addOrUpdate() }} className="rounded mx-auto d-block shadow p-3 mb-5 bg-light">
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
                                    <input type="number" min="1" max="100" className="form-control" value={age} onChange={(e) => { setAge(e.currentTarget.value) }} placeholder="Age" required />
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
                                    {/* <input type="text" className="form-control" placeholder="Gender" value={gender} onChange={(e) => { setGender(e.currentTarget.value) }} /> */}
                                    <select className="form-control" value={gender} onChange={(e) => { setGender(e.currentTarget.value) }}>
                                        <option value="male">
                                            Male
                                    </option>
                                        <option value="female">
                                            Female
                                    </option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label>Phone</label>
                                    <input type="text" className="form-control" pattern="[789][0-9]{9}" placeholder="Phone" value={phone} onChange={(e) => { setPhone(e.currentTarget.value) }} />
                                </div>
                            </div>
                            <button type="submit" className="btn mx-auto d-block  btn-primary"> {isNew ? "Add" : "Update"}</button>
                        </form>


                    </div>
                </div>

            </div>

        </>
    );
};

export default observer(Task);
