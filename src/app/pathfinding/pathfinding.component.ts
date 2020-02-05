import { Component, OnInit } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})

export class PathfindingComponent implements OnInit {

  public canvasWidth;
  public canvasHeight;
  public gridSize;
  public cubeLength;
  public cubeHeight;
  public startIndex;
  public endIndex;
  public xPos;
  public yPos;
  public mouseDrag=false;
  public stage:Konva.Stage;
  public layerA:Konva.Layer;
  public cells: any = [];


  constructor() {   }



  ngOnInit() {
    this.canvasWidth = 1200;
    this.canvasHeight = 600;
    this.gridSize = 50;
    this.cubeLength = this.canvasWidth/this.gridSize;
    this.cubeHeight = this.canvasHeight/this.gridSize;
    this.xPos = 0;
    this.yPos = 0;
    this.startIndex = Math.floor(Math.random()*(this.gridSize*this.gridSize))
    this.endIndex = Math.floor(Math.random()*(this.gridSize*this.gridSize))


    this.stage = new Konva.Stage({
      container: "myCanvas",
      width: this.canvasWidth,
      height: this.canvasHeight
    });

    this.layerA = new Konva.Layer();

    var i;
    var j;
    for (i = 0; i < this.gridSize; i++) {
      for(j=0; j < this.gridSize; j++)
      {
        this.layerA.add(this.addRect(
          this.cubeLength,
          this.cubeHeight,
          i,
          j,
          ))
      }
    }
    this.stage.add(this.layerA);



  }

  addRect(_length,_height,_i,_j) {
    var layer = this.layerA;
    var _drag = this.mouseDrag;


    const mouseDown = document.getElementById('myCanvas');


    var rectX = new Konva.Rect({
      x:_i*_length,
      y:_j*_height,
      width: _length,
      height: _height,
      fill: "#e0e0eb",
      stroke: "#b3b3cc",
      strokeWidth: 2,
      draggable: false,
      id:_i+","+_j,
      neighbors: ["these","are ","the","neighbors","array"],
      mouseDown:mouseDown.addEventListener('mousedown', e => {
            _drag = true;
          }),
      mouseUp:mouseDown.addEventListener('mouseup', e => {
            _drag = false;
          })
    });
    rectX.on('mousedown',function(){
      if (this.getAttr('fill') == 'red' || this.getAttr('fill') == 'blue')
      {
        return;
      }
      if(this.getAttr('fill')=='black')
      {
        this.fill('#e0e0eb')
        layer.draw();
      }
      else
      {
        this.fill('black');
        layer.draw()
      }
    });
    rectX.on('mouseover',function(){
      console.log('mouseOver')
      if (this.getAttr('fill') == 'red' || this.getAttr('fill') == 'blue')
      {
        return;
      }
      if(this.getAttr('fill')=='#e0e0eb' && _drag==true)
      {
        this.fill('black');
        layer.draw();
      }
      // else if(this.getAttr('fill')=='black' && _drag==true)
      // {
      //   this.fill('#e0e0eb');
      //   layer.draw();
      // }
    })
    return rectX;
  }

  start()
  {
    this.cells = this.layerA.find('Rect');
    var start = this.cells[this.startIndex];
    var end = this.cells[this.endIndex];
    start.fill('blue');
    end.fill('red');
    this.layerA.add(start);
    this.layerA.add(end);
    this.stage.add(this.layerA);
    this.colorizeNeighbors(start);
  }

  colorizeNeighbors(_start)
  {
    const layer = this.layerA;
    var start = _start;
    var idX;
    var idY;
    var currentCell;

    idX = start.getX()/this.cubeLength;
    idY = start.getY()/this.cubeHeight;
    for(var i = 1; i<=3;i++)
    {
      currentCell = this.cells[this.startIndex+i];


      setTimeout(function()
      {
        currentCell.fire('click');
        layer.draw();

      },2000*i);

    }
  }
}


/*

    drag and draw for dead spaces is working.
    the start and stop cells are immune from being clicked on or painted over

    because I can create custom attributes for Konva rects I do not need to implement
    any special node class for the PF algorithms, just add what I need to addRect()

    I will need to address the fact that the grid will overflow from one row to the next.
    Some clever matrix math will solve this.


*/
