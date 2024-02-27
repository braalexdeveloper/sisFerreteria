import { Injectable } from '@angular/core';
//import * as jspdf from 'jspdf';
import { jsPDF } from 'jspdf';  // Importa el tipo jsPDF directamente

import 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToPDF(tableData: any[], columns: string[], fileName: string,titleTable:string): void {
    //const doc = new (jspdf as any).jsPDF();
    const doc = new jsPDF();
    const header = columns.map(column => column.toUpperCase());
    
    // Construir filas
    const data = tableData.map(row => columns.map(col => row[col]));

    // Agregar encabezado
    doc.text(titleTable, 10, 10);
    
    // Agregar la tabla
    (doc as any).autoTable({
      head: [header],
      body: data,
    });
    // Descargar el archivo
    doc.save(`${fileName}.pdf`);
  }

  exportToPDFFactura(sale:any): void {
    //const doc = new (jspdf as any).jsPDF();
    
    const doc = new jsPDF();
   

    // Agregar imagen
  const logo = new Image();
  logo.src = 'https://cdn-icons-png.flaticon.com/512/5149/5149120.png'; // Ruta de tu imagen
  doc.addImage(logo, 'PNG', 10, 10, 20, 20); // x, y, ancho, alto
  
  const pageWidth = doc.internal.pageSize.getWidth(); // Obtener el ancho de la página
    // Agregar encabezado
const text = "FACTURA";
const fontSize = 30; // Tamaño de la fuente
const fontStyle = "bold"; // Estilo de la fuente
const font = "helvetica"; // Fuente
const titleWidth=doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
//const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
const xRight=pageWidth-titleWidth-10;   
//const x = (pageWidth - textWidth) / 2; // Calcular la posición x para centrar el texto

    doc.setFontSize(fontSize);
    doc.setFont(font, fontStyle);
     doc.setTextColor(15, 99, 212); 
    doc.text(text, xRight, 20);

    doc.setFontSize(12);
    doc.setFont(font, "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Av. Javier Prado 451, Lima - Perú", 10, 40);
    doc.text("946033402", 10, 45);

    doc.setFontSize(14);
    doc.setTextColor(12, 116, 187);
    doc.text("Datos del Cliente", 10, 70);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nombre: ${sale.client}`, 10, 80);
    const dateWidth=doc.getStringUnitWidth(`Fecha: ${sale.sale_date}`) * 12 / doc.internal.scaleFactor;
    const xRightDate=pageWidth-dateWidth-10;
    doc.text(`Fecha: ${sale.sale_date}`,xRightDate,40);
    doc.text("DNI: "+sale.dni, 10, 90);
    doc.text("Ruc: "+sale.ruc,10,100);
    doc.text(`Email: ${sale.email}`,10,110);
    doc.text(`Dirección: ${sale.address}`,10,120);
    
    doc.setFontSize(14);
    doc.text("Productos", 20, 145);
    const totalWidth=doc.getStringUnitWidth("Total de Compra : s/"+sale.total) * 14 / doc.internal.scaleFactor;
    const xRightTotal=(pageWidth-totalWidth)/2;
      doc.text("Total de Compra : s/"+sale.total, xRightTotal, 190);
   
      //doc.rect(10, 200, 50, 20); // x, y, width, height


   
    // Agregar la tabla
    let columnasName=["name","price","quantity","subtotal"];
    const header = columnasName.map(column => column.toUpperCase());
    
    // Construir filas
    const data = sale.products.map((row:any) => columnasName.map(col => row[col]));
   (doc as any).autoTable({
      head: [header],
      body: data,
      startY:150,
      //theme: 'grid',
      /*styles: {
        fillColor: [12, 116, 187] // Color de fondo de las celdas
      }*/
    });

    doc.output('dataurlnewwindow');
    // Descargar el archivo
   // doc.save("factura.pdf");

 
  }

}
