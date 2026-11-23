// 🐞 CONSOLA DE DEBUG FLOTANTE
(function() {
    console.log("🐞 Consola de Debug cargada.");
    
    // Crear el panel flotante
    const panel = document.createElement('div');
    panel.id = 'debug-panel';
    panel.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: rgba(0, 0, 0, 0.95);
        color: #10b981;
        font-family: 'Courier New', monospace;
        font-size: 11px;
        padding: 10px;
        overflow-y: auto;
        z-index: 9999;
        border-top: 2px solid #8b5cf6;
        display: none;
        white-space: pre-wrap;
        word-break: break-all;
    `;
    document.body.appendChild(panel);
panel.id = 'debug-panel';
    
    // Botón para mostrar/ocultar
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '🐞';
    toggleBtn.style.cssText = `
        position: fixed;
        bottom: 210px;
        right: 10px;
        z-index: 10000;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #8b5cf6;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 0 10px #8b5cf6;
    `;
    document.body.appendChild(toggleBtn);
toggleBtn.id = 'debug-toggle-btn';
    
    toggleBtn.onclick = () => {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };
    
    // Interceptar console.log, warn, error
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    function agregarLog(tipo, args) {
        const texto = args.map(a => {
            if (typeof a === 'object') {
                try { return JSON.stringify(a); } catch(e) { return String(a); }
            }
            return String(a);
        }).join(' ');
        
        const hora = new Date().toLocaleTimeString();
        const prefijo = tipo === 'error' ? '❌' : tipo === 'warn' ? '⚠️' : 'ℹ️';
        const color = tipo === 'error' ? '#ef4444' : tipo === 'warn' ? '#f59e0b' : '#10b981';
        
        const linea = document.createElement('div');
        linea.style.color = color;
        linea.textContent = `[${hora}] ${prefijo} ${texto}`;
        panel.appendChild(linea);
        panel.scrollTop = panel.scrollHeight;
    }
    
    console.log = function(...args) { originalLog.apply(console, args); agregarLog('log', args); };
    console.warn = function(...args) { originalWarn.apply(console, args); agregarLog('warn', args); };
    console.error = function(...args) { originalError.apply(console, args); agregarLog('error', args); };
    
    // Capturar errores globales
    window.addEventListener('error', function(e) {
        agregarLog('error', ['Error global: ' + e.message + ' en ' + e.filename + ':' + e.lineno]);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        agregarLog('error', ['Promesa rechazada: ' + e.reason]);
    });
    
    console.log("🐞 Consola de Debug lista. Pulsa el botón 🐞 para ver los logs.");
})();
