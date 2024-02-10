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

}
