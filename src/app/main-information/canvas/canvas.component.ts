import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { CanvasData } from './CanvasData'

@Component({
  selector: 'app-main-information-canvas',
  template: `
  <div class="container col-6">
    <h3>{{title}}</h3>
    <canvas id={{id}}></canvas>
      <div *ngIf="data.length > 0" class="histiry">
      <ul>
        <li *ngFor="let item of data">
          {{item.category}} <input type="color" value={{item.color}} />
        </li>
      </ul>
    </div>
  </div>`
})

export class CanvasComponent implements OnInit, AfterViewInit{
  @Input() data: CanvasData[];
  @Input() title: string;
  @Input() id: string;
  context: object;
  canvas: any ;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.canvas = document.getElementById(this.id);
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.context = eval(`this.canvas.getContext("2d")`);
    this.draw()
  }

  draw(){
    let totalValue = 0;
    let colorIndex = 0;
    let startAngle = 0;

    this.data.forEach((categ)=>{
            let val = categ.amount;
            totalValue += val;
        })
        console.log(totalValue);
    this.data.forEach((categ)=>{
      let val = categ.amount;
      let sliceAngle = 2 * Math.PI * val / totalValue;

      this.drawDiagramSlice(
                this.context,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                startAngle,
                startAngle + sliceAngle,
                categ.color
            );
            startAngle += sliceAngle;
    })

    this.drawDiagramSlice(this.context,this.canvas.width/2,
    this.canvas.height/2, 80, 0, Math.PI*2, "white")
  }

  drawDiagramSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }


}
