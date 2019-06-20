   

import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import React, { Component } from 'react';
import '../App.css';
import { SketchField, Tools } from 'react-sketch';


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
        lineWidth: 10,
        fillColor: '#68CCCA',
        backgroundColor: 'transparent',
        shadowWidth: 0,
        shadowOffset: 0,
        tool: Tools.Pencil,
        fillWithColor: false,
        fillWithBackgroundColor: false,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 600,
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
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };

    saveChanges = () => {
        let drawings = this.state.drawings;
        drawings.push(this._sketch.toDataURL());
        this.setState({drawings: drawings});
    };

    onSketchChange = () => {
        let prev = this.state.canUndo;
        let now = this._sketch.canUndo();
        console.log("test 2");

        if (prev !== now) {
            console.log("test 1");
            this.setState({canUndo: now});
        }
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
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
        let {controlledValue} = this.state;

        return (
            <div>
                <div className="canvas-header">
                    <button className="undo-button" style={styles.swatch} onClick={this.handleClick}>
                        <div style={styles.color} />
                    </button>
                    {
                        this.state.displayColorPicker ? <div style={styles.popover}>
                            <div style={styles.cover} onClick={this.handleClose} />
                            <SketchPicker color={this.state.color} onChange={this.handleChange} />
                        </div> : null
                    }
                    <button className="undo-button" disabled={!this.state.canUndo} onClick={this.undoChange} title="Undo last change!">Undo</button>
                    <button className="undo-button" disabled={!this.state.canRedo} onClick={this.redoChange}>Redo</button>
                    <button className="undo-button" disabled={!this.state.canUndo} onClick={this.clearChanges}>Clear</button>
                    <button className="undo-button" onClick={this.saveChanges} style={{cursor: 'not-allowed'}}>Save</button>
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