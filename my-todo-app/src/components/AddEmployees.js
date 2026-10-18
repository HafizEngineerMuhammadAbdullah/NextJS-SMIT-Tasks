'use client';

import { useState } from 'react';
import styles from './addEmp.module.css'
import { useDispatch } from 'react-redux';
import { addEmployee } from '../reduxjs-toolkit-for-state-management/slice';
import Link from 'next/link';

const AddEmployees = () => {
  const [empName, setEmpName] = useState('');
  const dispatch = useDispatch();
  // data send
  const dataDispatch = () => {
    console.log("Employee Name from Add Employee Input Field: ", empName);
    dispatch(addEmployee(empName));
    setEmpName('');
  }


  return (
    // For Container
    <div className={styles.container}>
      {/* Heading */}
      <h2 className={styles.title}>Add Employees</h2>
      {/* Input Field */}
      <input className={styles.input} value={empName} onChange={(e) => setEmpName(e.target.value)} type="text" placeholder="Enter Employee Data" />
      {/* Add Button to Add Task */}
      <button onClick={dataDispatch} className={styles.button}>Add</button>
      <Link href='/delete-employee'>Delete</Link>
    </div>
  );
}

export default AddEmployees;