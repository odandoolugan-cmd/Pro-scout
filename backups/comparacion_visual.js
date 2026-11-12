// 🌐 COMPARACIÓN VISUAL LADO A LADO
window.ComparacionVisual = {
    generar: function(j1, j2) {
        const atributos = ['overall', 'goals', 'assists', 'pace', 'shooting', 'passing', 'defending', 'physical'];
        const nombres = { overall: 'Overall', goals: 'Goles', assists: 'Asist', pace: 'Velocidad', shooting: 'Tiro', passing: 'Pase', defending: 'Defensa', physical: 'Físico' };
        
        let filas = '';
        atributos.forEach(attr => {
            const v1 = j1[attr] || 0;
            const v2 = j2[attr] || 0;
            const max = Math.max(v1, v2, 1);
            const p1 = (v1 / max) * 100;
            const p2 = (v2 / max) * 100;
            
            filas += `
            <div style="display:flex; align-items:center; margin-bottom:6px; font-size:0.75rem;">
                <div style="width:50px; text-align:right; padding-right:5px; color:#10b981; font-weight:bold;">${v1}</div>
                <div style="flex:1; background:#1e293b; height:8px; border-radius:4px; overflow:hidden; display:flex;">
                    <div style="width:${p1}%; background:#10b981; height:100%;"></div>
                </div>
                <div style="width:100px; text-align:center; color:#94a3b8;">${nombres[attr]}</div>
                <div style="flex:1; background:#1e293b; height:8px; border-radius:4px; overflow:hidden; display:flex; justify-content:flex-end;">
                    <div style="width:${p2}%; background:#3b82f6; height:100%;"></div>
                </div>
                <div style="width:50px; padding-left:5px; color:#3b82f6; font-weight:bold;">${v2}</div>
            </div>`;
        });
        
        return `
        <div style="padding:10px;">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:0.9rem; margin-bottom:10px;">
                <span style="color:#10b981;">${j1.name}</span>
                <span style="color:#3b82f6;">${j2.name}</span>
            </div>
            ${filas}
        </div>`;
    }
};
console.log("🌐 ComparacionVisual cargado.");
