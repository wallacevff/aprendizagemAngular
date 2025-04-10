import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

export type OnClickAction = (value: any) => void;
@Component({
  selector: 'navbar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnInit{
  @Input() onClick!: OnClickAction;
  @Output() onSearch = new EventEmitter<MouseEvent>();
  public searchForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: new FormControl<string>(''),
    })
  }
  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  handleClick(){
    const value = this.searchForm.value;
    if(this.onClick){
       this.onClick(value);
    }
  }

  onSearchChange(mouseEvent: MouseEvent): void {
    this.onSearch.emit(mouseEvent);
  }
}

