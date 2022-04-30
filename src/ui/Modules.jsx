import React, { useState, useEffect } from 'react';
import { Tooltip, Zoom, ToggleButton, Slider, Button, Typography } from '@mui/material';

export const Fonts = (props) => {
  const [fonts, setFonts] = useState([]);
  const [obfuscatedFont, setObfuscatedFont] = useState('');
  const [message, setMessage] = useState(null);
  const [params, setParams] = useState({FontSize: "12"})

  const fontCheck = new Set([
    // Windows 10
    'Inter', 'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
    'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
    'Standard Symbols PS', 'Zobi', 'Lohit Kannada', 'Samyak Devanagari', 'Sree Krushnadevaraya', 'URW Gothic', 'OpenSymbol', 'Khmer OS System', 'Nakula', 'Chandas', 'Potti Sreeramulu', 'Keraleeyam', 'Open Sans Condensed', 'Mukti Narrow', 'Mukti Narrow Bold', 'Meera', 'Nimbus Roman', 'Gurajada', 'Kalimati', 'Peddana', 'KacstQurn', 'Gubbi', 'Tibetan Machine Uni', 'Open Sans,Open Sans Condensed Light', 'Umpush', 'DejaVu Sans Mono', 'Purisa', 'Pothana2000', 'Noto Serif CJK JP', 'KacstBook', 'KacstLetter', 'Noto Serif CJK KR', 'Norasi', 'Loma', 'Karumbi', 'Open Sans,Open Sans Semibold', 'KacstDigital', 'KacstTitleL', 'mry_KacstQurn', 'Noto Serif CJK SC', 'Noto Serif CJK TC', 'Likhan', 'RaghuMalayalamSans', 'Mallanna', 'Yrsa,Yrsa Light', 'Padauk Book', 'Phetsarath OT', 'Sawasdee', 'Sahadeva', 'Rasa,Rasa Medium', 'Nimbus Sans', 'NATS', 'Tlwg Typist', 'Noto Sans Mono CJK SC', 'Tlwg Typewriter', 'Noto Sans Mono CJK TC', 'Manjari', 'Ubuntu,Ubuntu Thin', 'Noto Sans Mono CJK JP', 'Samyak Tamil', 'Noto Sans Mono CJK HK', 'Noto Sans Mono CJK KR', 'Yrsa,Yrsa Medium', 'Ubuntu', 'Chilanka', 'FreeSerif', 'Dhurjati', 'Nimbus Mono PS', 'Lohit Assamese', 'Padauk', 'AnjaliOldLipi', 'Ubuntu Condensed', 'Samyak Gujarati', 'Rasa,Rasa Light', 'ori1Uni,utkal', 'KacstOffice', 'Nimbus Sans Narrow', 'URW Bookman', 'Ramabhadra', 'DejaVu Sans', 'Kinnari', 'LakkiReddy', 'KacstArt', 'Lohit Odia', 'Tlwg Mono', 'Ponnala', 'Noto Sans Mono', 'aakar', 'Bitstream Charter', 'KacstOne', 'Ramaraja', 'Mitra Mono', 'Kalapi', 'NTR', 'Khmer OS', 'Courier 10 Pitch', 'C059', 'Laksaman', 'Liberation Sans Narrow', 'Open Sans', 'Liberation Mono', 'padmaa', 'Manjari', 'Timmana', 'Mandali', 'Rachana', 'Pagul', 'Lohit Telugu', 'Lohit Tamil Classical', 'Gayathri', 'Samanata', 'Droid Sans Fallback', 'RaviPrakash', 'Z003', 'Vemana2000', 'Gidugu', 'Lohit Gujarati', 'KacstPen', 'D050000L', 'KacstDecorative', 'TenaliRamakrishna', 'Suranna', 'Liberation Serif', 'Syamala Ramana', 'Lohit Malayalam', 'LKLUG', 'Ubuntu', 'FreeSans', 'Sarai', 'Yrsa,Yrsa SemiBold', 'Lohit Devanagari', 'Noto Color Emoji', 'Uroob', 'Noto Mono', 'KacstNaskh', 'Dyuthi', 'Lohit Tamil', 'Tlwg Typo', 'KacstFarsi', 'Suruma', 'Lohit Bengali', 'Abyssinica SIL', 'Jamrul', 'Waree', 'KacstTitle', 'Open Sans', 'P052', 'DejaVu Serif', 'Saab', 'Yrsa', 'Open Sans,Open Sans Extrabold', 'Navilu', 'Gargi', 'Garuda', 'Samyak Malayalam', 'Rekha', 'KacstScreen', 'Lohit Gurmukhi', 'FreeMono', 'Ubuntu Mono', 'Suravaram', 'Gayathri', 'Rasa,Rasa SemiBold'
  ].sort());
  useEffect(() => {

    (async () => {
      await document.fonts.ready;
      const fontAvailable = new Set();
      let alltrue = [...fontCheck].map(font => { return document.fonts.check(`12px "${font}"`) })
      let obfuscated = !new Set(alltrue).has(false)
      setObfuscatedFont(obfuscated)

      if (!obfuscated) {
        for (const font of fontCheck.values()) {
          if (document.fonts.check(`12px "${font}"`)) {
            fontAvailable.add(font);
          }
        }
      }
      else {
        ['Inter'].map(font => {
          fontAvailable.add(font);
        })
      }
      setFonts([...fontAvailable.values()])
    })();

  }, [])

  useEffect(()=> {

  }, [props.crop])

  return (
    <>
      <div className='rain-controls-wrapper'>

        <div id="font-form">


          {fonts.length > 1?
          <select id="font-selector" defaultValue={'Inter'} onChange={
            (e) => {
              document.getElementById('rainfall').style.fontFamily = document.getElementById('font-selector').value
            }} >
            {fonts.map(font => <option key={font}>{font}</option>)}
          </select>: null }
        </div>

        <div className="rc-sliders">
        <Typography gutterBottom>FontWeight</Typography>
        <Slider size="small" aria-label="Small" type="number" min={100} defaultValue={400} step={1} max={900} valueLabelDisplay="auto"  id="font-weight-selector" onChange={
            (e) => { 
              document.getElementById('rainfall').style.fontWeight = e.target.value
            }} />

        </div>
        
        <div className="rc-sliders">
        <Typography gutterBottom>LineHeight</Typography>
        <Slider size="small" aria-label="Small" type="number" min={0.00} defaultValue={1.00} step={0.01} max={2.80} valueLabelDisplay="auto" id="font-lineheight-input"  onChange={
            (e) => { document.getElementById('rainfall').style.lineHeight = e.target.value }} />
        </div>

        <div className="rc-sliders">
        <Typography gutterBottom>FontSize</Typography>
        <Slider size="small" aria-label="Small" type="number" min={12} defaultValue={50} step={0.1} max={120} valueLabelDisplay="auto"  id="font-size-input"  onChange={
            (e) => {
              document.getElementById('rainfall').style.fontSize = e.target.value  + 'px' 
              setParams({...params, FontSize: e.target.value})
            }} />
        </div>

        <div className="rc-sliders">
        <Typography gutterBottom>LetterSpacing</Typography>
        <Slider size="small" aria-label="Small" type="number" min={-params.FontSize/2} defaultValue={0} step={0.1} max={70} valueLabelDisplay="auto"  id="font-size-input"  onChange={
            (e) => {
              document.getElementById('rainfall').style.letterSpacing = e.target.value  + 'px' 
            }} />
        </div>

        <div className='rc-sliders'> 
          <Typography gutterBottom>Opacity</Typography>
            <Slider size='small' type='number' min={0} max={1} step={0.01} defaultValue={1} valueLabelDisplay="auto" onChange={(e, v) => {
            Array.from(document.getElementsByClassName('drop-parent')).map((d)=> {d.style.opacity = e.target.value})
          }} />
          </div>


        <div className="rc-sliders" id="font-matrix-container">
          <div id="font-matrix-form">
          <Typography gutterBottom>3D Rotation</Typography>
          <Slider size="small" aria-label="Small" type="number" id="font-matrix-input-a" defaultValue={1}  step={Math.PI/24} max={Math.PI*2} min={-Math.PI*2} onChange={
              (e) => { document.getElementById('rainfall').style.transform = `matrix(${e.target.value}, ${document.querySelector('#font-matrix-input-b span input').value}, ${document.querySelector('#font-matrix-input-c span input').value}, ${document.querySelector('#font-matrix-input-d span input').value}, 0, 0)` }} />

            <Slider size="small" aria-label="Small" type="number" id="font-matrix-input-b" defaultValue={0} step={Math.PI/24} max={Math.PI*2} min={-Math.PI*2}  onChange={
              (e) => { document.getElementById('rainfall').style.transform = `matrix(${document.querySelector('#font-matrix-input-a span input').value}, ${e.target.value}, ${document.querySelector('#font-matrix-input-c span input').value}, ${document.querySelector('#font-matrix-input-d span input').value}, 0, 0)` }} />

           <Slider size="small" aria-label="Small" type="number" id="font-matrix-input-c" defaultValue={0} step={Math.PI/24} max={Math.PI*2} min={-Math.PI*2}  onChange={
              (e) => { document.getElementById('rainfall').style.transform = `matrix(${document.querySelector('#font-matrix-input-a span input').value}, ${document.querySelector('#font-matrix-input-b span input').value}, ${e.target.value}, ${document.querySelector('#font-matrix-input-d span input').value}, 0, 0)` }} />
              
              <Slider size="small" aria-label="Small"  type="number" id="font-matrix-input-d" defaultValue={1} step={Math.PI/24} max={Math.PI*2} min={-Math.PI*2}  onChange={
              (e) => { document.getElementById('rainfall').style.transform = `matrix(${document.querySelector('#font-matrix-input-a span input').value}, ${document.querySelector('#font-matrix-input-b span input').value}, ${document.querySelector('#font-matrix-input-c span input').value}, ${e.target.value}, 0, 0)` }} />
        
              </div>
            <Typography gutterBottom>Crop/Full</Typography>

            <ToggleButton value={true} aria-label="Crop" onClick={() => {
              props.setCrop(!props.crop)
              document.getElementById('rain').style.overflow = props.crop ? 'hidden' : 'visible'
            }}>{props.crop? "Crop": "Full image"}</ToggleButton>
        
        <Tooltip TransitionComponent={Zoom} title={message ? message : ""}>
            <ToggleButton value={true} aria-label="Screenshot" onClick={() => {
               setMessage("Added to Library!"); setTimeout(() => { setMessage("") }, 1500);
              props.saveScreenshot()
            }}>Screenshot</ToggleButton>     
            </Tooltip>         
              
        </div>
      </div>
    </>


  )
}

export const ColorPicker = (props) => {
  const [color, setColor] = useState([props.values[0], props.values[1]]);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="rain-pickers">
      <input
        type="color"
        value={color[0]}
        onChange={(e) => {
          document.getElementById("rainfall").style.backgroundColor = e.target.value;
          setColor([e.target.value, color[1]]);
        }}
      />
      <input
        type="color"
        value={color[1]}
        onChange={(e) => {
          document.getElementById("rainfall").style.color = e.target.value;
          setColor([color[0], e.target.value]);
        }}
      />
      <Button variant="text" className="rain-button" type="reset" value="shuffle" onClick={() => {
        let colors = [getRandomColor(), getRandomColor()];
        document.getElementById("rainfall").style.backgroundColor = colors[0];
        document.getElementById("rainfall").style.color = colors[1];
        setColor(colors);
        document.getElementById('rain-input-mkir').focus()
      }} >Shuffle</Button>

    </div>
  );
};
