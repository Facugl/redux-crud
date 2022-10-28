import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Confirmar si desea eliminarlo
  const confiarEliminarProducto = id => {
    // preguntar al usuario
    Swal.fire({
      title: 'Are you sure?',
      text: "Yu won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
      // pasarlo al action
      dispatch( borrarProductoAction(id) )        
      }
    })
  }

  // Función que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch( obtenerProductoEditar(producto) );
    navigate(`/productos/editar/${producto.id}`);
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td><span className='font-weight-bold'>$ {precio}</span></td>
      <td className='acciones'>
        <button
          type='button'
          onClick={() => redireccionarEdicion(producto)}
          className='btn btn-primary mr-2'>Editar</button>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => confiarEliminarProducto(id)}
        >Eliminar</button>
      </td>
    </tr>
  )
}

export default Producto