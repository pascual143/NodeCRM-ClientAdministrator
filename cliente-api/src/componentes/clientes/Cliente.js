import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Cliente({ cliente }) {
	// extraer los valores
	const { _id, nombre, apellido, empresa, email, telefono } = cliente;

	// Eliminar cliente
	const eliminarCliente = idCliente => {
		Swal.fire({
			title: '¿Are you sure?',
			text: "Once you delete the client, can not been recovered",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.value) {
                // Llamado a axios
                clienteAxios.delete(`/clientes/${idCliente}`)
                    .then(res => {
                        Swal.fire(  
                            'Delete', 
                            res.data.mensaje, 
                            'success'
                        );
                    });
                    
			}
		});
	};

	return (
		<li className="cliente">
			<div className="info-cliente">
				<p className="nombre">
					{nombre} {apellido}
				</p>
				<p className="empresa">{empresa}</p>
				<p>{email}</p>
				<p>Phone: {telefono}</p>
			</div>
			<div className="acciones">
				<Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
					<i className="fas fa-pen-alt" />
					Edit Client
				</Link>

				<Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
					<i className="fas fa-plus" />
					New Order
				</Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar" 
                    onClick={() => eliminarCliente(_id)}
                >
					<i className="fas fa-times" />
					Delete Client
				</button>
			</div>
		</li>
	);
}
export default Cliente;
