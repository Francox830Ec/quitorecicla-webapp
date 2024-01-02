import {Component, Input, Output} from '@angular/core';

@Component({
  selector: 'app-logo-quito-dmqrblog',
  templateUrl: './logo-quito-dmqrblog.component.html',
  styleUrls: ['./logo-quito-dmqrblog.component.scss']
})
export class LogoQuitoDMQRBlogComponent {
  @Input() marginBottomQuitoRecicla: number = -3.3;
  @Input() widthHeightQuitoRecicla: number = 6;
  @Input() logoAlcaldiaMaxHeightCalculated: number = 150;
}
