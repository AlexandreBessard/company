import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PortfolioGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Accessing query parameters
    const queryParams = next.queryParams;
    const fromQueryParam = queryParams['from'];

    // Your logic here based on the query parameters
    // For example, if you want to allow navigation only if fromQueryParam exists and has a specific value
    if (fromQueryParam && fromQueryParam === 'portfolio') {
        this.router.navigate(['/home']).then(() => {
          setTimeout(() => {
            const element = document.getElementById('portfolio');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
          }, 100); // Adjust the timeout value as needed to ensure the home page is fully loaded before scrolling
        });
    }
    return true;
    }
}
