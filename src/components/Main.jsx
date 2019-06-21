

import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import React, { Component } from 'react';
import '../App.css';
import { SketchField, Tools } from 'react-sketch';
import dataJson from './data.json.js';
import dataJsonControlled from './data.json.controlled.js';


class Main extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },
        lineWidth: 3,
        drawings: [],
        canUndo: false,
        canRedo: false,
        lineColor: 'black',
        lineWidth: 80,
        fillColor: '#68CCCA',
        backgroundColor: 'transparent',
        shadowWidth: 0,
        shadowOffset: 0,
        tool: Tools.Pencil,
        fillWithColor: false,
        fillWithBackgroundColor: false,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 800,
        stretched: true,
        stretchedX: false,
        stretchedY: false,
        originX: 'left',
        originY: 'top'
    };


    handleClick = () => {

        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({
            displayColorPicker: false

        })
    };

    handleChange = (color) => {
        this.setState({
            color: color.rgb,
        })

    };

    undoChange = () => {

        this._sketch.undo();

        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };

    redoChange = () => {
        this._sketch.redo();

        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };

    clearChanges = () => {
        this._sketch.clear();

        this.setState({
            controlledValue: null,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };
    componentDidMount = () => {

        /*eslint-disable no-console*/

        (function (console) {
            console.save = function (data, filename) {
                if (!data) {
                    console.error('Console.save: No data');
                    return;
                }
                if (!filename) filename = 'console.json';
                if (typeof data === 'object') {
                    data = JSON.stringify(data, undefined, 4)
                }
                var blob = new Blob([data], { type: 'text/json' }),
                    e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');
                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e)
            }
        })(console);

        /*eslint-enable no-console*/

    };
    saveChanges = () => {
        let drawings = this.state.drawings;
        drawings.push(this._sketch.toDataURL());
        this.setState({ drawings: drawings });

    };

    downloadChanges = () => {
        this.setState({
            controlledValue: dataJsonControlled
        })

    };

    onSketchChange = () => {
        let prev = this.state.canUndo;
        let now = this._sketch.canUndo();

        if (prev !== now) {
            this.setState({ canUndo: now });
        }
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {

                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,

                },
                swatch: {
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,

                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });
        let { controlledValue } = this.state;

        return (
            <div className="App">
                <div className="canvas-header">
                    <div className="control-buttons">
                        <button className="color-picker" style={{ background: styles.color.background }} onClick={this.handleClick}>

                        </button>
                        {
                            this.state.displayColorPicker ? <div style={styles.popover}>
                                <div onClick={this.handleClose} />
                                <SketchPicker color={this.state.color} onChange={this.handleChange} />
                            </div> : null
                        }

                        <button
                            className="basic-button"
                            style={{ cursor: !this.state.canUndo ? 'not-allowed' : 'pointer' }}
                            disabled={!this.state.canUndo} onClick={this.undoChange}
                            title="Undo last change!"
                        >
                            Undo
                        </button>
                        <button
                            className="basic-button"
                            style={{ cursor: !this.state.canRedo ? 'not-allowed' : 'pointer' }}
                            disabled={!this.state.canRedo}
                            onClick={this.redoChange}
                        >
                            Redo
                        </button>
                        <button
                            className="basic-button"
                            style={{ cursor: !this.state.canUndo ? 'not-allowed' : 'pointer' }}
                            disabled={!this.state.canUndo}
                            onClick={this.clearChanges}
                        >
                            Clear
                        </button>
                        <button
                            className="basic-button"
                            onClick={this.saveChanges}
                            style={{
                                cursor: 'not-allowed',
                                opacity: '0.6'
                            }}
                            disabled={true}
                        >
                            Save
                        </button>
                        <button
                            className="basic-button"
                            onClick={this.downloadChanges}
                            disabled={true}
                            style={{
                                cursor: 'not-allowed',
                                opacity: '0.6'
                            }}
                        >
                            Load
                    </button>

                    </div>
                </div >
                <SketchField
                    className="canvas"
                    name='sketch'
                    ref={(c) => this._sketch = c}
                    lineColor={styles.color.background}
                    lineWidth={this.state.lineWidth}
                    fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
                    backgroundColor={this.state.fillWithBackgroundColor ? this.state.backgroundColor : 'transparent'}
                    width={this.state.controlledSize ? this.state.sketchWidth : null}
                    height={this.state.controlledSize ? this.state.sketchHeight : null}
                    defaultValue={dataJson}
                    value={controlledValue}
                    forceValue={true}
                    onChange={this.onSketchChange}
                    tool={this.state.tool}
                />


            </div>
        )
    }
}

export default Main;