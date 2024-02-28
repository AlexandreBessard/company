import { Injectable } from '@angular/core';
import { portfolioDetails } from "./data-portfolio-details";
import {portfolioDetailsInEnglish} from "./data-portfolio-details-en";

@Injectable({
  providedIn: 'root'
})
export class PortfolioDetailsService {
  constructor() {}

  getById(id: string) {
    return portfolioDetails.find((portfolio) => portfolio.id === id);
  }

  getByIdInEnglishContent(id: string) {
    return portfolioDetailsInEnglish.find((portfolio) => portfolio.id === id);
  }

}
