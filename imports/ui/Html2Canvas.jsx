import React, { useState } from "react";
import html2canvas from "html2canvas";
import { Tooltip } from "./Tooltip";
import { Uuid } from "./Uuid";

export const Html2Canvas = (props) => {
  const [canvas, setCanvas] = useState(null);
    if(props.tooltip.action == "createimg" || props.tooltip.clickforsave != true){
  html2canvas(
    document.getElementById(props.tooltip.children.props.id),
    {}
  ).then((canvas) => {
    if (props.tooltip.clickforsave) {
      canvas.onclick = function () {
        var image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        window.location.href = image;
      };
    }
    setCanvas(canvas.toDataURL("image/png"));
  });
}
    let uuid = Uuid()
    console.log("coucou", props)
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

    return <div>aie<img src={canvas} /></div>;
    }
    
  
  
  return null;
};
