import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Layout} from './shared/presentation/components/layout/layout';

@Component({
  imports: [RouterOutlet, Layout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('cummnis-solutions');

  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);

  /**
   * Creates an instance of App and sets up translation.
   */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }

}
