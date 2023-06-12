import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { useState } from 'react';
import ReactModal from 'react-modal';



export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
// export async function handleDelete(_id){

//   try {
//     // Send a DELETE request to the backend API endpoint
//     console.log('Delete is clicked')

//     console.log('id value is ',_id)
//     const response = await axios.delete(`http://localhost:8080/api/v1/delete/${_id}`)

//     console.log('made request to delete');

//     // if () {
//     //   setdeletedPopup(true)
//     // }
//     // Handle success, such as removing the image from the UI or showing a success message
//   } catch (error) {
//     // Handle error, such as displaying an error message
//     console.log(error)
//   }
// };


