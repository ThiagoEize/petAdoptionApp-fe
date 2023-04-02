import { useRef } from "react";
import React from 'react';
import MonowCard from '../monowCard/MonowCard';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Test = () => {
    const frontRef = useRef();
    const backRef = useRef();

    const generatePDF = async () => {
        const frontCanvas = await html2canvas(frontRef.current);
        const backCanvas = await html2canvas(backRef.current);
        const frontImgData = frontCanvas.toDataURL('image/png');
        const backImgData = backCanvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(frontImgData, 'PNG', 0, 0);
        pdf.addImage(backImgData, 'PNG', 105, 0);
        pdf.save('card.pdf');
    };

    return (
        <div>
            <div ref={frontRef} className="card-container">
                <p className="card-title">MONOW</p>
                <p className="card-subtitle">Saúde</p>
            </div>
            {/* <MonowCard
                ref={backRef}
                cpf="123.456.789-00"
                name="John Doe"
                email="john@example.com"
                password="password123"
            /> */}
            <div ref={backRef}>
                <div className="card-container">
                    <div className="card-content">
                        <p>CPF: 123.456.789-00</p>
                        <p>Nome: John Doe</p>
                        <p>Email: john@example.com</p>
                        <p>Senha: password123</p>
                    </div>
                </div>
            </div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    )
}

export default Test