import React, { useState } from "react";
import html2canvas from "html2canvas";
import { Tooltip } from "./Tooltip";
import { Uuid } from "./Membrane";

export const Html2Canvas = (props) => {
  const [canvas, setCanvas] = useState(null);
    if(props.tooltip.action == "createimg" || props.tooltip.clickforsave != true){
      console.log(props.tooltip.children[1].props)
  html2canvas(
    document.getElementById(props.tooltip.children[1].props.id),
    {scale: 1}
  ).then((canvas) => {
    setCanvas(canvas.toDataURL("image/png"));
    let testval = document.getElementsByClassName('html2save')[0] ? document.getElementsByClassName('html2save')[0].parentNode.classList.remove('container-div'): []  

  });
}
    let uuid = Uuid()
  if (props.tooltip.clickforsave == true) {

    return (
        <Tooltip
        action="saveimg"
        caption="Save"
        atselector={props.tooltip.atselector}
        clickforsave={true}
        uuid={uuid}
      > 
        <div id={uuid} className="html2save">
        <img src={canvas}/>
        </div>
      </Tooltip>
    )
    
    }

    else {
      
    return null;
    }
  
};
