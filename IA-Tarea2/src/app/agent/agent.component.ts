import {Component, OnInit} from '@angular/core';
import {DisplayState} from "../model/displayState";
import {Estado} from "../model/estado";
import {group} from "@angular/animations";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

export class AgentComponent implements OnInit {

  displayEstates: DisplayState[] = [
    {count: 0, location: 'A', left: 'DIRTY', right: 'DIRTY'},
    {count: 0, location: 'A', left: 'DIRTY', right: 'CLEAN'},
    {count: 0, location: 'A', left: 'CLEAN', right: 'DIRTY'},
    {count: 0, location: 'A', left: 'CLEAN', right: 'CLEAN'},
    {count: 0, location: 'B', left: 'DIRTY', right: 'DIRTY'},
    {count: 0, location: 'B', left: 'DIRTY', right: 'CLEAN'},
    {count: 0, location: 'B', left: 'CLEAN', right: 'DIRTY'},
    {count: 0, location: 'B', left: 'CLEAN', right: 'CLEAN'}
  ];

  states: Estado = {location: "A", left: "DIRTY", right: "DIRTY"}
  proceso = "EN PROCESO";
  terminar: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.test();
  }

  reflex_agent(location: string, state: string) {
    if (state == "DIRTY") return "CLEAN";
    else if (location === "A") return "RIGHT";
    else if (location === "B") return "LEFT";
    return "";
  }


  test(): void {
    let location = this.states.location;
    let state = this.states.location == "A" ? this.states.left : this.states.right;
    let action_result = this.reflex_agent(location, state);
    // @ts-ignore
    document.getElementById('log').innerHTML += "<br>Location: ".concat(location).concat(' | Action: ').concat(action_result);

    this.loadState();
    this.changeLocation(action_result, this.states.location);

    if (!this.terminar) {
      setTimeout(() => {
        this.test();
      }, 300);
      this.setAction();
    }
  }

  loadState() {
    let index = this.getIndexState(this.states);
    this.displayEstates[index].count += 1;
    let contador = 0;
    for (let i = 0; i < this.displayEstates.length; i++) {
      if (this.displayEstates[i].count >= 2) {
        contador++;
      }
    }
    if (contador == 8) {
      this.proceso = "TERMINADO";
      this.terminar = true;
    }
  }

  getIndexState(state: Estado) {
    for (let i = 0; i < this.displayEstates.length; i++) {
      if (this.displayEstates[i].location == state.location
        && this.displayEstates[i].left == state.left
        && this.displayEstates[i].right == state.right) {
        return i;
      }
    }
    return 0;
  }

  changeLocation(action: string, location: string) {
    if (action === "CLEAN") {
      if (location === "A") {
        this.states.left = "CLEAN";
        return;
      }
      this.states.right = "CLEAN";
      return
    } else if (action === "RIGHT") {
      this.states.location = "B";
    } else {
      this.states.location = "A";
    }
  }

  setAction(){
    let random = Math.floor(Math.random() * (17 - 1) + 1);
    let group1 = [1,4,7,10];
    let group2 = [2,5,8];
    let group3 = [3,6,9];
    if(group1.includes(random)){
      this.states.left = "DIRTY";
      // @ts-ignore
      document.getElementById('log').innerHTML += ' | DIRT : A';
    }else if(group2.includes((random))){
      this.states.right = "DIRTY";
      // @ts-ignore
      document.getElementById('log').innerHTML += ' | DIRT : B';
    }else if (group3.includes(random)){
      this.states.left = "DIRTY";
      this.states.right = "DIRTY";
      // @ts-ignore
      document.getElementById('log').innerHTML += ' | DIRT : BOTH';
    }else{
      // @ts-ignore
      document.getElementById('log').innerHTML += ' | DIRT : NONE';
    }
  }

}
