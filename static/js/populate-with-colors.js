//function make_button (color, i) {
    //  let onclick_fn = (function () {
      //                    selected = color
    //                    });
  //  return <button 
    //        onClick = onclick_fn 
  //          backgroundColor = color
//            style = 
                          

let make_button = (function () {
    let x = 0;
    
    return (function (color, idx) {
        let onclick_fn = (function () {
            clearing = false;
            selected_color = color
        });
        
        x += 2;
        
        return React.createElement('button', 
                                   {onClick: onclick_fn,
                                    key: idx,
                                    style: {//position: 'absolute',
                                            //transform: ("translate(" + x + "px, 0px)"),
                                            height: '10px',
                                            width: '4px',
                                            marginLeft: '5px',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            backgroundColor: color}},
                                   null)
    })
    })();


let buttons_arr = [];


for (let i = 0; i < colors.length; i++) {
    buttons_arr[i] = make_button(colors[i], i);
}



let root = ReactDOM.createRoot(document.getElementById('scroll'));

root.render(buttons_arr);

