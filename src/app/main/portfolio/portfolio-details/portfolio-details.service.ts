import { Injectable } from '@angular/core';
import { portfolioDetails } from "./data-portfolio-details";

@Injectable({
  providedIn: 'root'
})
export class PortfolioDetailsService {
  constructor() {}

  getById(id: string) {
    return portfolioDetails.find((portfolio) => portfolio.id === id);
  }

}
