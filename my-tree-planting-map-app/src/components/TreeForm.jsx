"use client";

import { ref, push } from "firebase/database";
import { database } from "../lib/firebase";
import { toast } from "react-toastify";
import Image from "next/image";

const TreeForm = ({ location, formData, setFormData, onSave }) => {
  // Initially, location = null, Therefore !location = true and the form isn't shown.
  // After clicking:   location = {lat, lng} Therefore, !location = false and the form is shown(and React renders the actual form.)
  if (!location) {
    return (
      <div className="rounded-lg border border-gray-700 bg-white px-3 py-4 flex items-center gap-2 hover:-translate-y-1 transition-all">
        <div className="w-12 h-12 border border-gray-700 rounded-full">
          <Image src="/assets/tree.png" width={100} height={100} className="object-contain" alt="Tree" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            Plant a Tree
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Click anywhere on the map to select a location.
          </p>

        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Error:validateForm() returns false for invalid input, but never returns true for valid input.
  //  JavaScript therefore returns undefined; !validateForm() is true, so handleSubmit exits before calling onSave().The save handler in page.js never gets a chance to add the tree.
  const validateForm = () => {
    if (!formData.userName.trim() || !formData.treeName.trim()) {
      alert("Please enter user name and tree name.");
      return false;
    }
    // definite submit blocker:  the validator has no success return so the submit handler treats valid input as invalid and exits before calling the save function
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Creates a reference to a folder named 'formSubmissions'
    const dbRef = ref(database, 'TreeUserData');

    // push() generates a unique ID for every form entry automatically
    await push(dbRef, {
      firstName: formData.userName,
      treeName: formData.treeName,
      message: "Form has been submitted successfully!",
      // new Date().toISOString() — Correct. Returns the current time in ISO format
      // ❌ Date.toISOString() — Throws a TypeError because it is an instance method, not a static method
      timestamp: new Date().toISOString()
    });


    // ToastContainer unmounts on submit. It’s inside the branch rendered only when location exists. After the toast call, onSave() clears location, causing that branch, including the container, to unmount. Keep the container mounted somewhere that doesn’t depend on the selected location, such as the app layout.


    toast('Form data sent successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });

    // Call the onSave function passed from the parent component (Home) to save the tree data.
    onSave();
  };

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Plant a Tree
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">



        {/* For UserName */}
        <div>
          <label htmlFor="userName" className="mb-1 block text-sm font-medium">
            User Name
          </label>

          <input
            id="userName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* For TreeName */}

        <div>
          <label htmlFor="treeName" className="mb-1 block text-sm font-medium">
            Tree Name
          </label>

          <input
            type="text"
            id="treeName"
            name="treeName"
            value={formData.treeName}
            onChange={handleChange}
            placeholder="e.g. Neem"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500 transition-all"
          />
        </div>

        {/* For Latitude */}

        <div className="grid grid-cols-2 gap-3">

          <div>
            <label htmlFor="latitude" className="mb-1 block text-sm font-medium">
              Latitude
            </label>

            <input
              id="latitude"
              type="text"
              value={location.lat.toFixed(6)}
              readOnly
              className="w-full rounded-md border bg-gray-100 px-3 py-2"
            />
          </div>

          {/* For Longitude */}

          <div>
            <label htmlFor="longitude" className="mb-1 block text-sm font-medium">
              Longitude
            </label>

            <input
              id="longitude"
              type="text"
              value={location.lng.toFixed(6)}
              readOnly
              className="w-full rounded-md border bg-gray-100 px-3 py-2"
            />
          </div>

        </div>


       {/* For Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 cursor-pointer"
        >
          🌳 Plant Tree
        </button>
      </form>
    </div>
  );
};

export default TreeForm;