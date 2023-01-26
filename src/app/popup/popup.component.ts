import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() confirmClicked = new EventEmitter<void>();

  onCancel() {
    this.cancelClicked.emit();
  }
  onConfirm() {
    this.confirmClicked.emit();
  }
}
