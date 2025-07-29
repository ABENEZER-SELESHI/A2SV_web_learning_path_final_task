//app/(components)/JobCardButton.tsx
'use client';
import React from 'react'
import styles from './JobCardButton.module.css'

interface JobCardButtonProps {
  style: 'inPerson' | 'education' | 'it';
  content: string;
}

const JobCardButton = ({style, content}: JobCardButtonProps) => {
  return (
    <div><button className={styles[style]}>{content}</button></div>
  )
}

export default JobCardButton