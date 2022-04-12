// import React, { useEffect, useState } from "react";
// import html2canvas from "html2canvas";
// import { Tooltip } from "./Tooltip";
// import { Uuid } from "./Membrane";

// export const Html2Canvas = (props) => {

// useEffect(() => {
//   console.log("deh", props)

// }, [props.crop])

//   const [canvas, setCanvas] = useState(null);
//     if(props.tooltip.action == "createimg" || props.tooltip.clickforsave != true){
//       let el = document.getElementById(props.tooltip.children[1].props.id)
      
//   html2canvas(
//     el,
//     {scale: 1}
//   ).then((canvas) => {
//     setCanvas(canvas.toDataURL("image/png"));

//   });
// }
//     let uuid = Uuid()
//   if (props.tooltip.clickforsave == true) {

//     return (
//         <Tooltip
//         crop={props.crop}
//         action="saveimg"
//         caption="Save"
//         atselector={props.tooltip.atselector}
//         clickforsave={true}
//         uuid={uuid}
//       > 
//         <div id={uuid} className="html2save">
//         <img src={canvas}/>
//         </div>
//       </Tooltip>
//     )
    
//     }



//     return null;
    
  
// };
