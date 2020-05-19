import React from 'react';

function DetallesPedido({pedido}) {

    const {cliente} = pedido;

    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: 0192019201291201</p>
                <p className="nombre">Client: {cliente.nombre} {cliente.apellido} </p>

                <div className="articulos-pedido">
                    <p className="productos">Articles Order: </p>
                    <ul>
                        {pedido.pedido.map(articulos => (
                            <li key={pedido._id+articulos.producto._id}>
                                <p>{articulos.producto.nombre} </p>
                                <p>Price: ${articulos.producto.precio} </p>
                                <p>Quantity: {articulos.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="total">Total: ${pedido.total} </p>

            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Delete Order
                </button>
            </div>
        </li>
    )
}

export default DetallesPedido;