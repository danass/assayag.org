import React, { useState, useEffect } from 'react';

export const Fonts = () => {
  const [fonts, setFonts] = useState([]);
  const [obfuscatedFont, setObfuscatedFont] = useState('');

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
        ['Inter', 'Arial', "Yours fonts are hidden"].map(font => {
          fontAvailable.add(font);
        })
      }
      setFonts([...fontAvailable.values()])
    })();
  }, [])

  return (
    <div>
      <div>

        <div id="font-form">
          <select id="font-selector" defaultValue={'Inter'} onChange={
            (e) => {
              document.getElementById('rainfall').style.font = "300 1rem " + document.getElementById('font-selector').value
            }} >
            {fonts.map(font => <option key={font}>{font}</option>)}
          </select>
        </div>
        
        <div id="font-size-form">
          <input type="number" id="font-size-input" defaultValue={16} onChange={
            (e) => {
              document.getElementById('rainfall').style.fontSize = document.getElementById('font-size-input') ? document.getElementById('font-size-input').value + 'px' : "12px"
            }} />

        </div>
      </div>
    </div>


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
      <input className="rain-button" type="reset" value="shuffle" onClick={() => {
        let colors = [getRandomColor(), getRandomColor()];
        document.getElementById("rainfall").style.backgroundColor = colors[0];
        document.getElementById("rainfall").style.color = colors[1];
        setColor(colors);
        document.getElementById('rain-input-mkir').focus()
      }} />

    </div>
  );
};