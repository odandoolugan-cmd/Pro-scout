// 🧠 INYECCIÓN AUTOMÁTICA DEL MODO OJEADOR
(function() {
    console.log("🧠 ModoOjeador UI cargado.");
    
    function inyectarVeredicto() {
        if (document.getElementById('modo-ojeador-panel')) return;
        
        const playerCard = document.querySelector('.player-card-big');
        if (!playerCard || !window.ModoOjeador || !window.currentPlayer) return;

        try {
            // Leer los datos reales de los paneles existentes
            const setun = window.resSetun ? window.resSetun.decision : 'COMPRAR (1)';
            const bitnet = window.scoutNeuronal ? window.scoutNeuronal.nivel : 'ÉLITE MUNDIAL';
            
            // Leer el estado de finanzas y lesiones si existen
            const finanzasEl = document.querySelector('[style*="SETUN FINANCIERO"]');
            const finanzasEstado = finanzasEl ? finanzasEl.textContent : 'PRECIO JUSTO';
            const finanzas = { estado: finanzasEstado.includes('INFRAVALORADO') ? 'INFRAVALORADO' : finanzasEstado.includes('SOBREVALORADO') ? 'SOBREVALORADO' : 'PRECIO JUSTO' };
            
            const lesionesEl = document.querySelector('[style*="RIESGO DE LESIÓN"]');
            const lesionesEstado = lesionesEl ? lesionesEl.textContent : 'BAJO';
            const lesiones = { nivel: lesionesEstado.includes('ALTO') ? 'ALTO' : lesionesEstado.includes('MEDIO') ? 'MEDIO' : 'BAJO' };
            
            const veredicto = window.ModoOjeador.generarVeredicto(window.currentPlayer, setun, bitnet, finanzas, lesiones);
            
            const panelHTML = `
            <div id="modo-ojeador-panel" style="margin-top:15px; padding:15px; border-radius:10px; background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border:2px solid ${veredicto.color}; font-family:'Inter', sans-serif; box-shadow:0 0 15px ${veredicto.color}40;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:bold;">🧠 VEREDICTO DEL OJEADOR</div>
                    <div style="font-size:0.6rem; color:${veredicto.color}; border:1px solid ${veredicto.color}; padding:2px 8px; border-radius:10px;">ANÁLISIS FINAL</div>
                </div>
                <div style="font-size:1.4rem; font-weight:bold; color:${veredicto.color}; margin-bottom:8px;">${veredicto.recomendacion}</div>
                <div style="font-size:0.8rem; color:#cbd5e1; margin-bottom:8px; line-height:1.4;">${veredicto.razon}</div>
                <div style="font-size:0.75rem; color:#f59e0b; background:rgba(245,158,11,0.1); padding:6px; border-radius:6px; border-left:3px solid #f59e0b;">💡 ${veredicto.inversionSugerida}</div>
            </div>`;
            
            playerCard.parentNode.insertBefore(document.createRange().createContextualFragment(panelHTML), playerCard.nextSibling);
            console.log("🧠 Veredicto del Ojeador añadido.");
        } catch(e) { console.error('Error ModoOjeador UI:', e); }
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setTimeout(inyectarVeredicto, 800);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('playerInfoContainer');
        if (container) observer.observe(container, { childList: true, subtree: true });
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'searchBtn') {
            setTimeout(inyectarVeredicto, 2000);
        }
    });
})();
