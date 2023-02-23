import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

function CanvasPage() {
  const [myStyle, setMyStyle] = useState({
    height: window.innerHeight / 3,
    width: window.innerWidth / 2,
    backgroundColor: "#D3C7C4",
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [color, setColor] = useState("#D3C7C4");
  const [color2, setColor2] = useState("#ffffff");
  const [num, setNum] = useState("01");
  const [number, setNumber] = useState("01");
  const [error, setError] = useState(false);

  const InputRef = useRef(null);

  const colorSelector = (newColor) => {
    setColor(newColor.hex);
    setMyStyle({ ...myStyle, backgroundColor: color });
  };

  const numberSet = (e) => {
    setNum(e.target.value);
    setError(false);
  };

  const HandlerClick = (e) => {
    e.preventDefault();
    if (num.length == 2) setNumber(num);
    else setError(true);
  };

  useEffect(() => {
    const input = InputRef.current;
    const ctx = input.getContext("2d");
    ctx.font = "3vw Comic Sans MS";
    setColor2(color2);
    ctx.fillStyle = color2;
    ctx.textAlign = "center";
    ctx.clearRect(0, 0, 200, 200);
    ctx.font = "50px Sans MS";

    ctx.fillText(`${number}`, input.width / 2, input.height / 1.7);
    const setter = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setMyStyle({
        ...myStyle,
        height: `${window.innerHeight / 3}px`,
        width: `${window.innerWidth / 2}px`,
      });
    };
    window.addEventListener("resize", setter);

    return () => {
      window.removeEventListener("resize", setter);
    };
  });

  return (
    <div className="main">
      <div className="picker">
        <SketchPicker onChange={colorSelector} color={color} value={color} />
      </div>
      <div className="canvas">
        <canvas style={myStyle} ref={InputRef}></canvas>
      </div>
      <br />
      <div className="num-input">
        <input
          id="num"
          type="number"
          placeholder="Enter two digit number"
          onChange={numberSet}
          value={num}
        />
        <button type="submit" onClick={HandlerClick}>
          Submit
        </button>
      </div>
      {error && (
        <div style={{ color: "red" }}>
          Wrong Number! Please enter two digit number
        </div>
      )}
    </div>
  );
}

export default CanvasPage;
