import { animate, state, style, transition, trigger } from '@angular/animations';
import { forwardRef } from '@angular/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
  ],
  animations: [
    trigger("visibilityChanged", [
      state("true", style({  'opacity':'1','height': '*', 'padding-top': '0px'})),
      state("false", style({  'opacity':'0','height': '15px', 'padding-top': '0px' })),
      transition("*=>*", animate("200ms")),
    ]),
  ],
})
export class DropDownComponent 
implements ControlValueAccessor, AfterViewInit, OnChanges {
innerValue = "";
@Input() data = [];
@Input() idd = "";
@Input() Textvalue = "";
@Input() disabled = false;
@Input() Idvalue = "";
@Input() text = "";
@Input() height = "50px";
@Input() pH: string;

@Input() c: FormControl = new FormControl();

@Input() optional = false;
@Output() valueChanged = new EventEmitter<any>();
errors: Array<any> = [];

@ViewChild("input", {static:false}) inputRef: ElementRef;

constructor(private translate: TranslateService) {
  translate.onLangChange.subscribe((val) => {
    try {
      console.log("onChange fired");
      console.log("changing", this.c);

      debugger;
      if (this.c.touched) {
        this.onChange(null, this.value);
      }
    } catch (e) {}
  });
}
ngOnChanges(...args: any[]) {
  try {
    this.value = args[0].c.currentValue.value;
    this.inputRef.nativeElement.value = this.value;
    this.c.valueChanges.subscribe((value) => {
      this.c.markAsTouched();
      this.innerValue = value;

      this.inputRef.nativeElement.value = this.value;
      this.errors = [];
      for (const key in this.c.errors) {
        if (this.c.errors.hasOwnProperty(key)) {
          this.errors.push(this.translate.instant(key + "v"));
        }
      }
    });
    this.inputRef.nativeElement.value = this.value;
    if (this.value !== "") {
      console.log("onChange fired");
      console.log("changing", this.c);
      this.onChange(null, this.value);
    }
  } catch (e) {}
}

ngAfterViewInit() {
  this.c.valueChanges.subscribe((value) => {
    this.c.markAsTouched();
    this.innerValue = value;

    this.inputRef.nativeElement.value = this.value;
    this.errors = [];
    for (const key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        this.errors.push(this.translate.instant(key + "v"));
      }
    }
  });
  if (this.pH === undefined) {
    this.pH = "Enter " + this.text;
  }
  this.c.valueChanges.subscribe(() => {
    if (
      this.c.value === "" ||
      this.c.value === null ||
      this.c.value === undefined
    ) {
      this.innerValue = "";
      this.inputRef.nativeElement.value = "";
    }
  });
}

onChange(e: Event, value: any) {
  this.innerValue = value;
  this.propagateChange(this.innerValue);
  this.valueChanged.emit(this.innerValue);
  this.errors = [];
  for (const key in this.c.errors) {
    if (this.c.errors.hasOwnProperty(key)) {
      this.errors.push(this.translate.instant(key + "v"));
    }
  }
}
onChanges(e: Event, value: any) {
  setTimeout(() => {
    this.innerValue = value;
    this.propagateChange(this.innerValue);
    this.valueChanged.emit(this.innerValue);
    this.errors = [];
    for (const key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        this.errors.push(this.translate.instant(key + "v"));
      }
    }
  }, 100);
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
      this.errors.push(this.translate.instant(key + "v"));
    }
  }}
}
