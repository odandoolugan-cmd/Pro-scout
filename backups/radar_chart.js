// 📊 GRÁFICO RADAR DE ATRIBUTOS (SVG PURO)
window.RadarChart = {
    generar: function(jugador) {
        const atributos = [
            { nombre: 'Velocidad', valor: jugador.pace || 70 },
            { nombre: 'Tiro', valor: jugador.shooting || 70 },
            { nombre: 'Pase', valor: jugador.passing || 70 },
            { nombre: 'Defensa', valor: jugador.defending || 50 },
            { nombre: 'Físico', valor: jugador.physical || 70 }
        ];
        
        const cx = 100, cy = 100, radio = 70;
        const numEjes = atributos.length;
        
        // Generar los puntos del polígono de datos
        let puntos = '';
        let ejes = '';
        let etiquetas = '';
        
        atributos.forEach((attr, i) => {
            const angulo = (Math.PI * 2 * i) / numEjes - Math.PI / 2;
            const valorRatio = attr.valor / 100;
            
            // Punto del eje exterior (100%)
            const xEje = cx + Math.cos(angulo) * radio;
            const yEje = cy + Math.sin(angulo) * radio;
            ejes += `M${cx},${cy} L${xEje},${yEje} `;
            
            // Punto de los datos reales
            const xDato = cx + Math.cos(angulo) * radio * valorRatio;
            const yDato = cy + Math.sin(angulo) * radio * valorRatio;
            puntos += `${xDato},${yDato} `;
            
            // Etiqueta
            const xLabel = cx + Math.cos(angulo) * (radio + 20);
            const yLabel = cy + Math.sin(angulo) * (radio + 20);
            etiquetas += `<text x="${xLabel}" y="${yLabel}" fill="#94a3b8" font-size="8" text-anchor="middle" dominant-baseline="middle">${attr.nombre}</text>`;
        });
        
        const svg = `
        <svg width="200" height="200" viewBox="0 0 200 200" style="background:rgba(15,23,42,0.9);border-radius:10px;border:1px solid #334155;">
            <!-- Ejes -->
            <path d="${ejes}" stroke="#334155" stroke-width="1" fill="none"/>
            <!-- Círculos de referencia (25%, 50%, 75%) -->
            <circle cx="${cx}" cy="${cy}" r="${radio * 0.25}" stroke="#334155" stroke-width="0.5" fill="none"/>
            <circle cx="${cx}" cy="${cy}" r="${radio * 0.5}" stroke="#334155" stroke-width="0.5" fill="none"/>
            <circle cx="${cx}" cy="${cy}" r="${radio * 0.75}" stroke="#334155" stroke-width="0.5" fill="none"/>
            <!-- Polígono de datos -->
            <polygon points="${puntos}" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="2"/>
            <!-- Puntos de los vértices -->
            ${atributos.map((attr, i) => {
                const angulo = (Math.PI * 2 * i) / numEjes - Math.PI / 2;
                const xDato = cx + Math.cos(angulo) * radio * (attr.valor / 100);
                const yDato = cy + Math.sin(angulo) * radio * (attr.valor / 100);
                return `<circle cx="${xDato}" cy="${yDato}" r="3" fill="#10b981"/>`;
            }).join('')}
            <!-- Etiquetas -->
            ${etiquetas}
        </svg>`;
        
        return svg;
    }
};
console.log("📊 RadarChart cargado.");
