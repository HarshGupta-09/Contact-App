import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { MdSearch } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
  import { ToastContainer, toast } from 'react-toastify';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config/firebase";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddUpdate from "./components/AddUpdate";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isopen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  

 
  async function getContacts() {
    try {
      const contactsRef = collection(db, "contacts");
      const snapshot = await getDocs(contactsRef);
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  useEffect(() => {
    getContacts();
  }, []);

 
  async function deleteContact(id) {
    try {
      const contactRef = doc(db, "contacts", id);
      await deleteDoc(contactRef);
      toast.success("Contact Succesfully Deleted...")
      getContacts(); 
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

 
  function handleAdd() {
    setSelectedContact(null);
    setIsUpdate(false);
    setIsOpen(true);
  }

 
  function handleEdit(contact) {
    setSelectedContact(contact);
    setIsUpdate(true);
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
    getContacts(); 
  }

  return (
    <div className="max-w-[370px] mx-auto px-4">
      <NavBar />

      <div className="flex mt-4">
        <div className="relative flex flex-grow items-center gap-[10px]">
          <MdSearch className="text-white text-3xl absolute ml-1" />

          <input
            className="flex-grow rounded-[10px] border-[1px] px-[10px] py-[7px] pl-9 border-white bg-transparent text-white h-[40px]"
            placeholder="Search Contact"
            type="text"
            id="searchBox"
          />

          <div className="rounded-full bg-white p-2 cursor-pointer">
            <IoAdd className="text-3xl font-bold" onClick={handleAdd} />
          </div>
        </div>
      </div>

      {/* Contact List */}
      <div className="mt-4">
        {contacts.length === 0 ? (
          <p className="text-center text-white mt-5">No contacts found.</p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex justify-between bg-[#FFEAAE] rounded-xl p-2 items-center mt-2"
            >
            
              <div className="flex gap-2 items-center">
                <FaUserCircle className="text-4xl text-[#F6820C]" />
                <div className="text-black">
                  <h2 className="font-medium">{contact.name}</h2>
                  <p className="text-sm">{contact.Email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex text-2xl gap-3">
                <FaEdit
                  className="cursor-pointer text-blue-600"
                  onClick={() => handleEdit(contact)}
                />
                <MdDelete
                  onClick={() => deleteContact(contact.id)}
                  className="text-[#5F00D9] cursor-pointer"
                />
              </div>
            </div>
          ))
        )}
      </div>

     
      <AddUpdate
        isopen={isopen}
        onClose={onClose} isUpdate={isUpdate} contact={selectedContact}   />
        <ToastContainer />
    </div>
  );
}

export default App;
