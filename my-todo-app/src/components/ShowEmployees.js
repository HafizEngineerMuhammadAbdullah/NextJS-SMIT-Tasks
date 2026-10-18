'use client'
import { useDispatch, useSelector } from 'react-redux';
import styles from './addEmp.module.css';
import { removeEmployee } from '../reduxjs-toolkit-for-state-management/slice';

const ShowEmployees = () => {
  // Employee Data is basically an Array
  const employeeData = useSelector((data) => data.employeeData.employees);
  // print the employeeData array
  console.log("Employee Data from Show Employee : ", employeeData);
  
  const dispatch = useDispatch();
  return (
    // For Container
    <div className={styles.container}>
      {/* For Title */}
      <h2 className={styles.title}>Show Employees</h2>
      {
        employeeData.map((item) => (
          <h4 key={item.id}>
            {/* Item/Task Name */}
            <span>{item.name}</span>
            {/* Delete Button to Remove Task from the Screen*/}
            <button className={styles.button} onClick={() => dispatch(removeEmployee(item.id))}>Delete</button>
          </h4>
        ))
      }
    </div>
  );
}

export default ShowEmployees;