import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {

  ELEMENT_DATA: Task[] = [
    {position: 1, title: 'RWD Implementation', category: 'Web', added_date: new Date(2019,7,15), description: 'We need to implement Resposive Web Design', type: 'Billable'},
    {position: 2, title: 'Icon Change', category: 'Android', added_date: new Date(2019,7,15), description: 'We need to change our old Icon of Mobile App', type: 'Feature'},
    {position: 3, title: 'System update', category: 'IOS', added_date: new Date(2019,7,16), description: 'We need to carry out an update', type: 'Current Affairs'},
    {position: 4, title: 'Ranking system', category: 'Android', added_date: new Date(2019,7,18), description: 'We need to add a ranking system to our Mobile App', type: 'Feature'},
    {position: 5, title: 'New phones', category: 'IOS', added_date: new Date(2019,7,22), description: 'We need to buy new Iphones X for our employees', type: 'Billable'},
    {position: 6, title: 'Bootstrap Implementation', category: 'Web', added_date: new Date(2019,7,23), description: 'We need to implement Bootstrap', type: 'Feature'},
  ];

  categories = [
    {value: 'Web', viewValue: 'Web'},
    {value: 'Android', viewValue: 'Android'},
    {value: 'IOS', viewValue: 'IOS'}
  ];

  types = [
    {value: 'Billable', viewValue: 'Billable'},
    {value: 'Feature', viewValue: 'Feature'},
    {value: 'Current-Affairs', viewValue: 'Current Affairs'}
  ];

  constructor() {}

  getData(): Observable<Task[]> {
    return of<Task[]>(this.ELEMENT_DATA);
  }

  getCategories() {
    return this.categories;
  }

  getTypes() {
    return this.types;
  }

  taskAdd(data) {
    this.ELEMENT_DATA.push(data);
  }

  taskDelete(index) {
    let i;

    for (i = 0; i < this.ELEMENT_DATA.length; ++i) {
        if (this.ELEMENT_DATA[i].position == index){
          this.ELEMENT_DATA.splice(i, 1)
        }
    }
  }

  taskEdit(index) {
    // To do
  }

  taskDetails(index) {
    const post = this.ELEMENT_DATA.filter(item => item.position === index);
    return post;
  }

  dataLength() {
    let data_length = this.ELEMENT_DATA.length - 1;
    var last_position = this.ELEMENT_DATA[data_length].position;
    return last_position + 1;
  }
}