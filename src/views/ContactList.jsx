import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import ContactCard from '../components/ContactCard';
import Swal from 'sweetalert2';

const ContactList = () => {
  const { store, actions } = useContext(Context);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Estás seguro que deseas eliminar el contacto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar'
    }).then((response) => {
      if (response.isConfirmed) {
        Swal.fire('Contacto eliminado con éxito', '', 'success');
        actions.deleteContact(id);
      } else if (response.isDenied) {
        Swal.fire('El contacto NO fue eliminado', '', 'info');
      }
    });
  };

  return (
    <div className="container">
      <div className="content contact-list">
        <div className="card card-default">
          <div className="card-header align-items-center px-3 px-md-5">
            <h2>Contacts</h2>
            <Link to="/addcontact">
              <button className='btn btn-primary'>Add new contact</button>
            </Link>
          </div>
          <div className="card-body px-3 px-md-5">
            {
              !store.contactList || !store.contactList.length ?
              <div>No tienes contactos agregados</div>
              :
              <div className="row">
                {
                  store.contactList.map((contact) => {
                    return (
                      <div key={contact.id}>
                        <ContactCard contact={contact} />
                        <div>
                          <button onClick={() => handleDelete(contact.id)} className="btn btn-danger">Eliminar</button>
                          <Link to={`/UpdateContact/${contact.id}`} className="btn btn-warning">Editar</Link>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;