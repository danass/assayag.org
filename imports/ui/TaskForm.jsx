import React, { useState } from "react";
import { TasksCollection } from "../api/Collection";
import { TaskRender } from "./TaskRender";
import { render } from "react-dom";
import { Uuid } from "./Uuid";
import html2canvas from "html2canvas";
import { Tooltip } from "./Tooltip";
import { Html2Canvas } from "./Html2Canvas";
import { ColorPicker } from "./ColorPicker";

pluie = [];
canvasses = [];

export const TaskForm = () => {
  const [text, setText] = useState("");
  const [Tdiv, setTdiv] = useState(<div>Make it rain</div>);

  return (
    <div>
      <ColorPicker />
      <Tooltip
        action="createimg"
        caption="Screenshot"
        atselector="rain-library"
      >
        <div id="rainfall" className="rainfall">
          {Tdiv}
        </div>
      </Tooltip>

      <input className="rain-input"
        type="text"
        placeholder="Make it rain"
        value={text}
        onChange={(e) => {
          pluie.push({ _id: Uuid(), text: e.target.value });
          rain = pluie.map((drop) => <TaskRender key={drop._id} task={drop} />);
          setTdiv(rain);
          setText(e.target.value);
        }}
      />

      <div id="rain-library"></div>
    </div>
  );
};
