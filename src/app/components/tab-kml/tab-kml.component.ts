import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-txt-to-kml',
  standalone: true,
  templateUrl: './tab-kml.component.html',
  imports: [ NgIf]
})
export class TabKmlComponent {
  kmlData: string | null = null;
  ruta : string = 'ruta';
  fileName: string = 'export.kml';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.fileName = file.name.replace(/\.[^/.]+$/, '').toLowerCase+ '.kml';

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.kmlData = this.convertToKML(text);
    };
    reader.readAsText(file);
  }

  convertToKML(text: string): string {
    const lines = text.split('\n').filter(l => l.trim() !== '');
    let placemarks = '';
    

    for (let line of lines) {
      const cols = line.split('\t');

      if (cols.length < 18) continue; // aseguramos que haya columnas suficientes

      this.ruta = cols[0]?.trim();
      const folio = cols[1]?.trim();
      const nombre = cols[2]?.trim();
      const direccion = cols[3]?.trim();
      const socio = cols[4]?.trim();
      const sum = cols[5]?.trim();
      const medidor = cols[6]?.trim();
      const latitud = cols[16]?.trim();
      const longitud = cols[17]?.trim();

      if (!latitud || !longitud) continue;

      const description = `
        Folio: ${folio}<br/>
        Dirección: ${direccion}<br/>
        Socio: ${socio}<br/>
        Suministro: ${sum}<br/>
        Medidor: ${medidor}
      `;

      placemarks += `
        <Placemark>
          <name>${nombre}</name>
          <description><![CDATA[${description}]]></description>
          <Point>
            <coordinates>${longitud},${latitud},0</coordinates>
          </Point>
        </Placemark>
      `;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
      <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
          <name>${'ruta-' + this.ruta}</name>
          ${placemarks}
        </Document>
      </kml>`;
  }

  downloadKML() {
    if (!this.kmlData) return;
    const blob = new Blob([this.kmlData], { type: 'application/vnd.google-earth.kml+xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
