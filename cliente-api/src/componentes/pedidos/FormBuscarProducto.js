import React from 'react';

function FormBuscarProducto(props) {
    return(
            <form
                onSubmit={props.buscarProducto}
            >
                <legend>Search a Product and add a quantity</legend>

                <div className="campo">
                    <label>Products:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Productos" 
                        name="productos" 
                        onChange={props.leerDatosBusqueda}
                    />
                </div>

                <input
                    type="submit"
                    className="btn btn-azul btn-block"
                    value="Buscar Producto"
                />

            </form>
    )
}
export default FormBuscarProducto;