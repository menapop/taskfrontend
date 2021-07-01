import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ 'opacity':'1','height': '*', 'padding-top': '0px' })),
      state('false', style({ 'opacity':'0','height': '0px', 'padding-top': '0px' })),
      transition('*=>*', animate('200ms')),
    ]), 
  ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() innerValue;
  @Output() valueChanged = new EventEmitter<any>();
  @Input() haveHide = false;
  hide = true;
  @Input() type = 'text';
  @Input() hent = '';
  @Input() idd = '';
  @Input() IsDisabled = false;
  @Input() text = '';
  @Input() height = '53px';
  @Input() pH: string;
  @Input() c: FormControl = new FormControl();
  @Input() optional = false;

  @Input() IsDateTime = false;
  errors: Array<any> = [];

  @ViewChild('input', {static:false}) inputRef: ElementRef;

  constructor(private translate: TranslateService,) {
    this.value = this.innerValue;
    translate.onLangChange.subscribe((val) => {
      try {
        console.log('onChange fired');
        console.log('changing', this.c);
        if (this.c.touched) {
          this.onChange(null, this.value);
        }
      } catch (e) {}
    });
  }
  ngOnChanges(...args: any[]) {
    try {
      this.value = args[0].c.currentValue.value;

      if (this.value !== '') {
        console.log('onChange fired');
        console.log('changing', this.c);

        this.onChange(null, this.value);
      }
    } catch (e) {}
  }

  ngAfterViewInit() {
    console.log(this.c);
 
    this.c.valueChanges.subscribe((value) => {
      this.c.markAsTouched();
      this.innerValue = value;

      this.errors = [];
      for (const key in this.c.errors) {

        if (this.c.errors.hasOwnProperty(key)) {
          this.errors.push(this.translate.instant(key + 'v'));
        }
      }
    });
    if (this.pH === undefined) {
      this.pH = 'Enter ' + this.text;
    }
    this.c.valueChanges.subscribe(() => {
      if (this.c.value === '' || this.c.value === null || this.c.value === undefined) {
        this.innerValue = '';
        this.inputRef.nativeElement.value = '';
      }
    });
  }

  onChange(e: Event, value: any) {
    value = this.type === 'number' ? +this.value : this.value;

    this.innerValue = this.type === 'number' ? +this.innerValue : this.innerValue;
    this.propagateChange(this.innerValue);
    this.valueChanged.emit(this.innerValue);
    this.errors = [];
    for (const key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        this.errors.push(this.translate.instant(key + 'v'));
      }
    }
  } 
  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  propagateChange = (_: any) => {};

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.errors = [];
    for (const key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        this.errors.push(this.translate.instant(key + 'v'));
      }
    }
  }
}