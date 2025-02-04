import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';



export const authGuard: CanActivateFn = (route, state) => {
  const _route = inject(Router)
  if(localStorage.getItem('_token') !== null){
  return true;
  }else{
    _route.navigate(['/login']);
    return false;
  }
};
