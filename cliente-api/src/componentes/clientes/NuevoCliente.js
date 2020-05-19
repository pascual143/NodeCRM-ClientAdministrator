import React, {Fragment, useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'; 
import clienteAxios from '../../config/axios';

// import el Context
import { CRMContext } from '../../context/CRMContext';

function NuevoCliente({history}){

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // cliente = state, guardarcliente = funcion para guardar el state
    const[cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa : '',
        email: '',
        telefono :''
    });

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            // obtener una copia del state actual
            ...cliente, 
            [e.target.name] : e.target.value
        })

    }

    // Añade en la REST API un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        // enviar petición
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                // validar si hay errores de mongo 
                if(res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                // Redireccionar
                history.push('/');
            });
    }

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring
        const { nombre, apellido, email, empresa, telefono} = cliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // return true o false
        return valido;
    }

    // verificar si el usuario esta autenticado o no
    if(!auth.auth && (localStorage.getItem('token') === auth.token ) ) {
        history.push('/iniciar-sesion');
    }

    return (


        <Fragment>
            <h2>New Client</h2>
            
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Surname:</label>
                    <input type="text" 
                          placeholder="Apellido Cliente" 
                          name="apellido" 
                          onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Company:</label>
                    <input type="text" 
                          placeholder="Client's Company" 
                          name="empresa" 
                          onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                            placeholder="Client's Email" 
                            name="email" 
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Phone:</label>
                    <input type="tel" 
                        placeholder="Client's Phone" 
                        name="telefono" 
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        disabled={ validarCliente() }
                    />
                </div>
            </form>
        </Fragment>
    )
}

// HOC, es una función que toma un componente y retorna un nuevo componente
export default  withRouter(NuevoCliente);