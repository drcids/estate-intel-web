import { Component, OnInit } from '@angular/core';
import { Color, Filter, Item, Shape } from 'src/app/interface/items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public shapes: Shape[] = [
    {
      shape: 'circle',
      active: true 
    },{
      shape: 'square', 
      active: true 
    },{
      shape: 'rectangle', 
      active: true 
    }
  ];
  public colors: Color[] = [
    {
      color: 'red',
      active: true 
    },{
      color: 'blue', 
      active: true 
    },{
      color: 'yellow', 
      active: true 
    }
  ];

  public items: Item[] = [];
  public gridTitle: string = 'All items:';
  public filter: Filter = {
    shape: [],
    color: []
  }

  constructor() { }

  ngOnInit(): void {

    this.generateItems();

  }

  private generateItems() {

    for(const shape in this.shapes) {

      for(const color in this.colors) {

        this.items.push({
          shape: this.shapes[shape].shape,
          color: this.colors[color].color
        });

        if(!this.filter.color.includes(this.colors[shape].color)){
          this.filter.color.push(this.colors[shape].color);
        }

      }

      this.filter.shape.push(this.shapes[shape].shape);

    }

  }

  public addShapeToFilter(x: Shape) {

    x.active = !x.active;

    if(!this.filter.shape.includes(x.shape) && x.active){

      this.filter.shape.push(x.shape)

    }else{

      let index = this.filter.shape.indexOf(x.shape);
      if(index > -1){

        this.filter.shape.splice(index, 1);

      }

    }

    this.changeGridTitle();

  }

  public addColorToFilter(x: Color) {

    x.active = !x.active;

    if(!this.filter.color.includes(x.color) && x.active){

      this.filter.color.push(x.color)

    }else{
      
      let index = this.filter.color.indexOf(x.color);
      if(index > -1){

        this.filter.color.splice(index, 1);

      }
      
    }

    this.changeGridTitle();

  }

  public changeGridTitle() {

    let selectedShapeNo = this.filter.shape.length
    let selectedColorNo = this.filter.color.length

    if(selectedShapeNo == this.shapes.length && selectedColorNo == this.colors.length) {

      this.gridTitle = 'All Items:'

    }else if((selectedShapeNo > 1 && selectedShapeNo < this.shapes.length && selectedColorNo == 3) || 
      (selectedShapeNo == 3 && selectedColorNo > 1 && selectedColorNo < this.colors.length)) {

      this.gridTitle = 'Multiple items:'

    }else if(selectedShapeNo == this.shapes.length && selectedColorNo == 1) {

      this.gridTitle = 'All '+this.filter.color[0]+' items:'

    }else if(selectedShapeNo == 1 && selectedColorNo == this.colors.length) {

      this.gridTitle = 'All '+this.filter.shape[0]+' items:'

    }else if(selectedShapeNo < this.shapes.length && selectedShapeNo > 1 && selectedColorNo == 1) {

      this.gridTitle = 'Multiple '+this.filter.color[0]+' items:'

    }else if(selectedShapeNo == 1 && selectedColorNo < this.colors.length && selectedColorNo > 1) {

      this.gridTitle = 'Multiple '+this.filter.shape[0]+' items:'

    }else if(selectedShapeNo == 1 && selectedColorNo == 1){

      this.gridTitle = this.filter.shape[0]+' '+this.filter.color[0]+' items:'

    }else if(selectedShapeNo > 1 && selectedShapeNo < this.shapes.length && selectedColorNo > 1 && 
      selectedColorNo < this.colors.length){

      this.gridTitle = 'Multiple items:'

    }else{

      this.gridTitle = 'All Items:'

    }

  }


}
