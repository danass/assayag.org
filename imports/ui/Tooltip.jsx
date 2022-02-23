import React, { useState } from "react";
import { render } from "react-dom";
import { Html2Canvas } from "./Html2Canvas";
import { Uuid } from "./Uuid";

import { TaskRender } from "./TaskRender";

let allcanvas = [];

export const Tooltip = (props) => {
  function handleClick() {
    if (props.action == "createimg") {
      try {
        allcanvas.push({
          _id: Uuid(),
          text: <Html2Canvas tooltip={props} />,
        });
        all = allcanvas.map((drop) => (
          <TaskRender key={drop._id} task={drop} />
        ));
        render(all, document.getElementById(props.atselector));
      } catch (e) {
        console.error("errore", e);
      }
    }
  }
  console.log(props)

  // let tooltipsave = document.getElementById(uuid)
  // tooltipsave.onclick = function () {
  //     var image = canvas
  //         .toDataURL("image/png")
  //         .replace("image/png", "image/octet-stream");
  //     window.location.href = image;
  //     }        


  return (
    <div
      className="container-for-div-with-tooltip"
    >
      <div className="container-div">
        {props.children}
      </div>
      <div className="container-tooltip" onClick={handleClick} id={props.clickforsave? props.uuid: null}>
        <label className="tooltip-label">{props.caption}</label>
      </div>
    </div>
  );
};
