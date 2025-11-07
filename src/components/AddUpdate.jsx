import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import {toast} from'react-toastify';
const AddUpdate = ({ isopen, onClose, isUpdate, contact }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isUpdate && contact) {
      setName(contact.name || '')
      setEmail(contact.Email || '')
    } else {
      setName('')
      setEmail('')
    }
  }, [isUpdate, contact])

  const addContact = async (e) => {
    e.preventDefault()
    try {
      const contactsRef = collection(db, 'contacts')
      await addDoc(contactsRef, {
        name: name,
        Email: email,
        createdAt: new Date(),
      })
    toast.success('contact Added Sucessfully')
 
    
      setName('')
      setEmail('')
      onClose()
    } catch (error) {
      console.error('Error adding contact', error)
    }
  }


  const updateContact = async (e) => {
    e.preventDefault()
    try {
      const contactRef = doc(db, 'contacts', contact.id)
      await updateDoc(contactRef, {
        name: name,
        Email: email,
      })
      toast.success("contact updated Succesfully")
     
      onClose()
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  return (
    <Modal isOpen={isopen} onClose={onClose}>
      <form onSubmit={isUpdate ? updateContact : addContact}>
        <div className="flex flex-col gap-1">
          <label htmlFor="Name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="border px-[0.8rem] h-[40px] border-[#000000]"
            type="text"
            id="Name"
            required
          />

          <label htmlFor="Email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email ID"
            className="border px-[0.8rem] h-[40px] border-[#000000]"
            type="email"
            id="Email"
            required
          />

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-[#FCCA3F] px-[12px] py-[6px] rounded-sm transition-all duration-500 hover:bg-[#af8208]"
            >
              {isUpdate ? 'Update' : 'Add'} Contact
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddUpdate
