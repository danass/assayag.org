import React, { useState } from "react";
import { render } from "react-dom";
import { Html2Canvas } from "./Html2Canvas";
import { Uuid } from "./Uuid";
import html2canvas from "html2canvas";
import { TaskRender } from "./TaskRender";
import { isMobile } from "./Menu"

export const Tooltip = (props) => {

  const [allcanvas, setallCanvas] = useState([ {
    _id: Uuid(),
    text: <Html2Canvas tooltip={props} />,
  }]);

  function handleClick() {

    
    if (props.action == "createimg") {
     
      try {
        
        setallCanvas([{
          _id: Uuid(),
          text: <Html2Canvas tooltip={props} />,
        }, ...allcanvas]);

        let all = allcanvas.map((drop) => (
          <TaskRender key={drop._id} task={drop} />
        ));

        render(all, document.getElementById(props.atselector));

      } catch (e) {
        console.error("errore", e);
      }
    }
    else {
      

      if(props.clickforsave) {
        

        if(props.directCreation) {
          html2canvas(
            document.getElementById(props.uuid),
            {scale: 1}
          ).then((canvas) => {
            var link = document.createElement("a");
            document.body.appendChild(link); // for Firefox
            link.setAttribute("href", canvas.toDataURL("image/png"));
            link.setAttribute("download",  'rain-' + props.uuid + '.png');
            link.click();

          });
          return
        }


        let tooltipsave = document.getElementById(props.uuid)
        var link = document.createElement("a");
        document.body.appendChild(link); // for Firefox
        link.setAttribute("href", tooltipsave.children[0].src);
        link.setAttribute("download",  'rain-' + props.uuid + '.png');
        link.click();
        
      }
     
    }

  }

console.log(isMobile())

  return (
    
    <div
      className={"container-for-div-with-tooltip" + (isMobile()? ' container-rain-mobile': '')}>
        
      <div className={"container-div"}>
        {props.children}
      </div>
      <div className="container-tooltip" onClick={handleClick} id={props.clickforsave? props.uuid: null}>
        <label className="tooltip-label">{props.caption}</label>
      </div>
    </div>
  );
};
