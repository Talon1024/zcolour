import React, { Component } from 'react';
import ColorPicker from 'react-simple-colorpicker';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorHtml: "#000000",
      colorRgb: [0,0,0],
      colorHex: "000000",
      colorInt: 0
    };
  }

  rgbToInt(components) {
    return components.reduceRight((s,x,i) => s | (x << ((2 - i) * 8)));
  }

  parseRgba(rgbaStr) {
    if (rgbaStr.startsWith("rgba(")) {
      let components = rgbaStr.substring(5).split(",");
      components = components.map((comp) => {
        const parenIndex = comp.search(/[()]/);
        let numStr;
        if (parenIndex >= 0) {
          numStr = comp.substring(0, parenIndex);
        }
        numStr = comp.trim();
        return Number.parseInt(numStr, 10);
      });
      return components.slice(0,3);
    }
  }

  handleColorPick = (color) => {
    const colorComponents = this.parseRgba(color);
    const colorInt = this.rgbToInt(colorComponents);
    const colorHex = colorComponents.reduce((s,c) => {
      return s + c.toString(16).padStart(2, "0");
    }, "");
    const colorHtml = `#${colorHex}`;
    this.setState({
      colorHtml,
      colorRgb: colorComponents,
      colorInt,
      colorHex
    });
  }

  handleComponentInput = (e) => {
    const compIdx = Number.parseInt(e.target.dataset.component, 10);
    const compStr = e.target.value || "0";
    let comp = Number.parseInt(compStr, 10);
    comp = Math.max(Math.min(comp, 255), 0);
    const components = this.state.colorRgb.slice();
    components[compIdx] = comp;
    const colorInt = this.rgbToInt(components);
    const colorHex = `${colorInt.toString(16).padStart(6, "0")}`;
    const colorHtml = `#${colorHex}`;
    this.setState({
      colorInt,
      colorRgb: components,
      colorHtml,
      colorHex
    });
  }

  handleIntInput = (e) => {
    const intStr = e.target.value || "0";
    const colorInt = Number.parseInt(intStr, 10);
    const colorHex = `${colorInt.toString(16).padStart(6, "0")}`;
    const colorHtml = `#${colorInt.toString(16).padStart(6, "0")}`;
    const colorRgb = [
      colorHex.substring(0,2),
      colorHex.substring(2,4),
      colorHex.substring(4,6)
    ].map((x) => Number.parseInt(x, 16));
    this.setState({
      colorHtml,
      colorRgb,
      colorInt,
      colorHex
    });
  }

  handleHexInput = (e) => {
    let hexStr = e.target.value;
    if (hexStr.startsWith("#")) {
      hexStr = hexStr.substring(1);
    }
    const colorHtml = `#${hexStr}`;
    const components = [0,0,0].map((_,i) => {
      return Number.parseInt(hexStr.substring(i * 2, (i + 1) * 2), 16);
    });
    const colorInt = this.rgbToInt(components);
    this.setState({
      colorHtml,
      colorHex: hexStr,
      colorInt,
      colorRgb: components
    })
  }

  render() {
    return (
      <div className="App">
        <ColorPicker color={this.state.colorHtml} onChange={this.handleColorPick} />
        <div className="rgbInputs">
          <input type="number" onChange={this.handleComponentInput} value={this.state.colorRgb[0]} className="bigInput" data-component={0}/>
          <input type="number" onChange={this.handleComponentInput} value={this.state.colorRgb[1]} className="bigInput" data-component={1}/>
          <input type="number" onChange={this.handleComponentInput} value={this.state.colorRgb[2]} className="bigInput" data-component={2}/>
        </div>
        <div className="rgbInputs">
          <input type="number" onChange={this.handleIntInput} value={this.state.colorInt} className="bigInput" />
          <input type="text" onChange={this.handleHexInput} value={this.state.colorHex} className="bigInput" />
        </div>
      </div>
    );
  }
}

export default App;
