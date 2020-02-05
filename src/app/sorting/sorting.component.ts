import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import {RandHexColor,RandInt} from "../util/utils";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  public canvasWidth;
  public canvasHeigh;
  public numElements;
  public horizontal_buffer;
  public vertical_buffer;
  public elementWidth;
  public elementHeight;


  public stage:Konva.Stage;
  public sortingLayer:Konva.Layer;
  public elements: any = [];

  constructor() { }

  ngOnInit() {

    this.canvasWidth = 1200;
    this.canvasHeigh = 600;
    this.numElements = 60;
    this.horizontal_buffer = this.canvasWidth;
    this.vertical_buffer = this.canvasHeigh*.8;
    this.elementWidth = this.canvasWidth/this.numElements;
    // elementHeight is set somewhere else

    this.stage = new Konva.Stage({
      container: "sortingCanvas",
      width: this.canvasWidth,
      height: this.canvasHeigh,
    });

    this.sortingLayer = new Konva.Layer();


    for(var i = 0;i<this.numElements;i++)
    {
      const color = RandHexColor();
      this.elementHeight = RandInt(this.vertical_buffer,1);
      this.sortingLayer.add(this.addRect(
        this.elementWidth,
        this.elementHeight,
        i,
        color
      ))
    }
    this.stage.add(this.sortingLayer);
    this.elements = this.sortingLayer.find('Rect');
    //console.log(this.elements);
  }
  addRect(_width,_height,_i,_color)
  {
    var layer = this.sortingLayer;
    var rectX = new Konva.Rect({
      x:_i*_width,
      y: this.canvasHeigh-_height,
      width:_width,
      height:_height,
      fill:_color,
      index:_i

    });
    rectX.on('click',function(){
      console.log(this.getAttr('index'));
    });
    return rectX;
  }

  swap()
  {
    /*
      this does not truly swap anything, just takes one element
      and places it either on top of or behind another, at another
      location on the line.

      when the moved element is at its new position, it does retain
      original index position. I do think this needs to change.
      check console statement in rectX.on('click'){}
    */
    const currentCell = this.elements[RandInt(this.numElements,0)];
    const newPos = RandInt(this.numElements,0);
    //console.log('currentCell:',currentCell,'newPos:',newPos);
    currentCell.setAttr('x',newPos*this.elementWidth);
    this.sortingLayer.draw();
  }
}






/*
      FIRST! I am using member variables waaay too much.

      The current state of this component is I can move an element
      to a new position, this places a second element at the destination.

      I think the setup for the component is complete, I just need to implement
      the sorting algorithms.
 */
