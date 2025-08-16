const ctx = document.getElementById('canvas').getContext('2d');

let pointerIsDown = false;


function getXY (canva, x, y) {
    
    const rect = canva.getBoundingClientRect();
    
    const x_coord = (x - rect.left) * (canva.width / rect.width);
    
    const y_coord = (y - rect.top) * (canva.height / rect.height);
    
    return {x_coord, y_coord}
    
}
    


document.getElementById('canvas').addEventListener('pointerdown', (e) => {
    
    e.preventDefault();
    
    let canvas = e.target;
    
    pointerIsDown = (() => { if (e.button === 0) { return !pointerIsDown } else { return pointerIsDown }})();
    
    let {x_coord, y_coord} = getXY(canvas, e.clientX, e.clientY);
    
    ctx.fillStyle = (() => { if (!selected_color) { return 'black' } else { return selected_color } })();
    
    const handleMove = (e) => {
        
        e.preventDefault();
        
        if (pointerIsDown) {
            
            let {x_coord: new_xcoord, y_coord: new_ycoord} = getXY(canvas, e.clientX, e.clientY);
            
            x_coord = new_xcoord;
            
            y_coord = new_ycoord;
            
        } else { canvas.removeEventListener('pointermove', handleMove) }
    }
    
    canvas.addEventListener('pointermove', handleMove);
    
    
    const pointerRelease = (e) => {
        
        e.preventDefault();
        
        pointerIsDown = !pointerIsDown;
        
        let canvasData = String(canvas.toDataURL('image/png'));
    
        fetch((window.location.origin + '/save'), {
             method: 'POST',
             headers: {
                 'Content-Type': 'text/plain'
             },
             body: canvasData
         }).then(response => { canvas_url = canvasData;});
        
        canvas.removeEventListener('pointerup', pointerRelease)
        
    }
    
    canvas.addEventListener('pointerup', pointerRelease);
    
    const pointerLeave = (e) => {
        
        e.preventDefault();
        
        canvas.dispatchEvent(new Event('pointerup'));
        
        
        canvas.removeEventListener('pointerleave', pointerLeave)
        
    }
    
    canvas.addEventListener('pointerleave', pointerLeave);
    
    const interval = setInterval(() => {
        
        if (pointerIsDown) {
            
            if (clearing) {
                
                ctx.clearRect(x_coord, y_coord, px, px)
                
            } else { ctx.fillRect(x_coord, y_coord, px, px) }
            
        } else { clearInterval(interval) }
        
    }, 0);
    
});