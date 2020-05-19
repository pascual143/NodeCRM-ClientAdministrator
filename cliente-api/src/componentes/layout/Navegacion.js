import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

    return ( 
        <aside className="sidebar col-3">
            <h2>Administration</h2>

            <nav className="navegacion">
                <Link to={"/"} className="clientes">Clients</Link>
                <Link to={"/productos"} className="productos">Products</Link>
                <Link to={"/pedidos"} className="pedidos">Orders</Link>
            </nav>
        </aside>

     );
}
 
export default Navegacion;