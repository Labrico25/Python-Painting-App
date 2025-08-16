
const root = ReactDOM.createRoot(document.getElementById('new-canvas'))

const modal = ReactDOM.createRoot(document.getElementById('modal'));

let first_render;

let second_render;


class popup extends React.Component {
    
    render () {
        return React.createElement('div', {
            style: {
                zIndex: 1,
                position: 'fixed',
                left: '0px',
                top: '0px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
                height: window.outerHeight,
                width: window.outerWidth
            }
           
        }, [React.createElement('h3', {
            style: {
                color: 'white',
                position: 'absolute',
                transform: 'translate(500px, 90px)'
            }
        }, "Make sure you have downloaded your progress as this action cannot be undone"), second_render])
    }
}


const onclick_button = (e) => {
    e.preventDefault();
    
    root.render(React.createElement('div', {}, null));
    
    modal.render(React.createElement(popup, null))
}


first_render = React.createElement('button', {
    
    onClick: onclick_button, 
    
    style: {
        
        color: "white",
        
        cursor: 'pointer',
        
        background: 'none',
        
        border: 'none'
    
    }}, "New");


const onGoBack = (e) => {
    e.preventDefault();
    
    modal.render(React.createElement('div', {}, null));
    
    root.render(first_render)
}


const onNew = (e) => {
    e.preventDefault();
    
    const post_data = {value: "Destroy"};
    
    fetch((window.location.origin + '/destroy'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(post_data)
    }).then(response => { location.reload() })
}


const children = [React.createElement('button', {
    onClick: onGoBack,
    
    key: 0,
    
    style: {position: 'absolute',
            transform: 'translate(10px, 40px)',
            cursor: 'pointer',
            width: '70px',
            height: '20px'
           }
}, 'Go back'),
                  React.createElement('button', {
                      onClick: onNew,
                      
                      key: 1,
                      
                      style: {position: 'absolute',
                              transform: 'translate(120px, 40px)',
                              cursor: 'pointer',
                              width: '70px',
                              height: '20px'
                             }
                  }, "=>")
                  ];


second_render = React.createElement('div', {
    style: {
        position: 'absolute',
        transform: 'translate(700px, 200px)',
        width: '200px',
        height: '100px',
        backgroundColor: 'black'}

}, children);


root.render(first_render);