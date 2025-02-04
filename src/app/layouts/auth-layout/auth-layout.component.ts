import { Component } from '@angular/core';
import { NavbarAuthComponent } from '../../components/navbar-auth/navbar-auth.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarAuthComponent, RouterOutlet ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
