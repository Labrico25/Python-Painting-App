function downloadImage (name) {
    
    let nth;
    
    return (function () {
        
        if (nth) {
            
            const file_name = (name + '(' + nth + ').png');
            
            nth += 1;
            
            let link = document.createElement('a');
            
            link.download = file_name;
            
            link.href = document.getElementById('canvas').toDataURL('image/png');
            
            link.click()
            
        } else {
            
            const file_name = (name + '.png');
            
            nth = 1;
            
            let link = document.createElement('a');
            
            link.download = file_name;
            
            link.href = document.getElementById('canvas').toDataURL('image/png');
            
            link.click()
        }
    }
            )
}



const downloadbtn = React.createElement('button', {
    
    onClick: downloadImage('painting'),
    
    style: {
        background: 'none',
        border: 'none',
        color: 'white',
        width: '80px',
        cursor: 'pointer',
        height: '42px'
    }
    
}, "Download");



const root = ReactDOM.createRoot(document.getElementById('download-op'));



root.render(downloadbtn);
    
    