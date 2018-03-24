import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { CanvasData } from './CanvasData'

@Component({
  selector: 'app-main-information-canvas',
  template: `
  <div class="container">
    <h3 class="text-center mb-5">{{title}}</h3>
    <div class="row">
      <canvas class="col-8"id={{id}}></canvas>
      <div class="col-4"id={{historyId}}></div>
    </div>
  </div>`
})

export class CanvasComponent implements OnInit, AfterViewInit{
  @Input() data: CanvasData[];
  @Input() title: string;
  @Input() id: string;
  historyId: string;
  context: object;
  canvas: any ;

  constructor() {
  }

  ngOnInit() {
    this.historyId = `history-${this.id}`
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
    this.canvas.height/2, 80, 0, Math.PI*2, "white");

    if (this.data.length > 0){
      let history = document.getElementById(this.historyId)
      var legendHTML = "";
      for (let categ of this.data){
        legendHTML += `
        <div><span style='display:inline-block;width:20px;
        background-color:${categ.color};'>&nbsp;</span>${categ.category}</div>`;
      }
      history.innerHTML = legendHTML;
    }

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
