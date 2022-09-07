// toast.component.ts
import {Component, HostBinding, TemplateRef} from '@angular/core';
import {ToastService} from '../services/Toast/toast.service';

@Component({
  selector: 'grid-watch-app-toasts',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  @HostBinding('class.ngb-toasts')
  _hasBaseClass = true;
  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }
}