
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { DatePicker, Space } from 'antd'
import { useAuthContext } from '../../Context/AuthContext'
import { firestore } from '../../../config/firebase';
import { doc,  setDoc, } from 'firebase/firestore';
// import { UesDoxContext } from '../../Context/DoxContext';
  
import {UesDoxContext} from '../../Context/DoxContext';

const initialdate = { startDate: "", endDate: "" };
const initialState = { title: "", description: "" };
const colorArr = [ "#D1EAED", "#FFD4A9", "#b8dbd9", "#b7e4c7", "#A8F9FF","#9AE5E6" , "#81A094" , "#775B59" , "#A6A2A2", "#BB4430" , "#7EBDC2" , "#ECD444" , "#6E2594", "#A14A76" , "#FFA8A9", "#35CE8D" , "#7692FF" , "#7692FF", "#A379C9",  "#fb5607","#06d6a0","#4361ee", "#e0b1cb" , "#be95c4" , "#81b29a", "#15616d" , "#1f7a8c" , "#0081a7" , "#ffcad4" ,"#aaf683","#ffd97d", "#60d394" ,"#ff9b85" ,"#fec5bb" ,"#cdc1ff"]
const { RangePicker } = DatePicker;


export default function StickyWall() {
  const {documents} = UesDoxContext()

 

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState)
  const { user } = useAuthContext()
  const [confirmLoading, setConfirmLoading] = useState(false);

  // --------------------- handle date ------------------
  const [date, setDate] = useState([]);
  const [objdate, setObjDate] = useState(initialdate);
  const handleDate = (_, dateString) => {
    setDate(dateString)

  }
  // -------------------------handle date end

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  // ---------------------- add task modle -------------------
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {

    window.notify("You Cancel the task", "info")
    setOpen(false);
  };

  const handleOk = async () => {
    let { title, description } = state
    let todo = { title, description }
    let { startDate, endDate } = objdate
    startDate = date[0]
    endDate = date[1]
    todo.startDate = startDate
    todo.endDate = endDate
    todo.randumId = Math.random().toString(36).slice(2)
    todo.bgColor = colorArr[Math.floor(Math.random() * (7 + 1))]
    todo.dateCreated = new Date().getTime()
    todo.createdBy = {
      email: user.email,
      uid: user.uid,
    }
    if (title.length < 3) {
      return window.notify("Please Enter Title!", "info")
    }
    if (description.length < 10) {
      return window.notify("Please Enter Description!", "info")
    }
    setConfirmLoading(true);
    try {
      await setDoc(doc(firestore, "todos", todo.randumId), todo);
      setConfirmLoading(false);
      setOpen(false);
      window.notify("Added Task Successuly", "success")
    } catch (err) {
      window.notify("Task is not added", "error")

    }
    setState(initialState)
    setObjDate(initialState)
    setDate([])
  };





  
  return (
    <>
      <div className="container bg-dark">
        <div className="row">
          {
            documents.map((doc, i) => {
              return <>
                <div className="col-12 col-md-6 col-lg-4 " key={i} >
                  <div className="box my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ backgroundColor: `${doc.bgColor}` }} >
                    <h4 className='text-center'>{i + 1}.</h4>
                    <h4>{doc.title}</h4>
                    <p><b>Description :</b> {doc.description}</p>
                    <p><b>Email :</b> {doc.createdBy.email}</p>
                    {/* <p>ID : {doc.randumId}</p>
                     <p>BgColor : {doc.bgColor}</p> */}
                    <p><b>Date :</b> {doc.startDate} <b> To </b> {doc.endDate}</p>
                  </div>
                </div>
              </>
            })
          }

          <div className="col-12 col-md-6 col-lg-4">
            <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" onClick={showModal}>
              <a className='Plus nav-link'>+</a>
            </div>
          </div>
        </div>
      </div>


      {/* --------------- Modal --------------- */}
      <Modal
    
        title="Enter Your Note"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="row">
          <div className="col">
            <label htmlFor="title" className='fw-bold'>Title</label> <br />
            <input type="text" placeholder='Enter Title' id='title' className='w-100 form-control ' value={state.title} name='title' onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="floatingTextarea2" className='fw-bold'>Description</label> <br />
            <div className="form-floating">
              <textarea  placeholder='Message' className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name='description' value={state.description} onChange={handleChange}>

              </textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col mt-3">
            <label className='fw-bold '>Select Date</label> <br />
            <Space direction="vertical" size={12}>
              <RangePicker
                onChange={handleDate}
               
              />
            </Space>
          </div>
        </div>
      </Modal>



 

    </>
  )
 
}
