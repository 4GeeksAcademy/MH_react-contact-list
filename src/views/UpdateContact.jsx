import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2';

export const UpdateContact = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams(); // Usar useParams para obtener el ID de la ruta

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      email,
      address,
    };

    const success = await actions.updateContact(data, id);

    if (success) {
      Swal.fire('Éxito!', 'Contacto actualizado correctamente!', 'success');
      // Redireccionar o limpiar campos si es necesario
    } else {
      Swal.fire('Error!', 'Error al actualizar contacto.', 'error');
    }
  };

  const getContact = () => {
    const contact = store.contactList.find((contact) => contact.id === id);

    if (!contact) {
      console.log('Contacto no encontrado');

    } else {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      setAddress(contact.address);
    }
  };

  useEffect(() => {
    getContact();
  }, [store.contactList]); // Se asegura de que se ejecute cuando la lista de contactos cambie

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
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target .value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary m-1">Actualizar</button>
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