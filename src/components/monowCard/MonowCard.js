import React, { forwardRef } from 'react';
import './MonowCard.css';

const MonowCard = forwardRef(({ cpf, name, email, password }, ref) => (
    <div ref={ref}>
        <div className="card-container">
            <div className="card-content">
                <p>CPF: {cpf}</p>
                <p>Nome: {name}</p>
                <p>Email: {email}</p>
                <p>Senha: {password}</p>
            </div>
        </div>
    </div>
));

export default MonowCard;