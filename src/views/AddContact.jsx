import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2';



export const AddContact = () => {
  const { store, actions } = useContext(Context);
  
 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      name,
      phone,
      email,
      address,
    };

    const success = await actions.createContact(data);

    if (success) {
      Swal.fire('Exito!', 'Contact agregado correctamente!', 'exito');
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
    } else {
      Swal.fire('Error!', 'Error .', 'error');
    }
  };

  return (
        <div className="container">
      <div className="row p-0">
        <div
          className="col h4"
          style={{
           
            borderRadius: "3px",
            padding: "40px",
            background: "white",
            color: "black"
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary m-1">
                Submit
              </button>
              <Link to="/" className="btn btn-success" style={{ marginLeft: '10px' }}>
                Ir a Lista Conctactos
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};