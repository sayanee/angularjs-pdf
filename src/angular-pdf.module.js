import angular from 'angular';
import { NgPdf } from './angular-pdf.directive'

export const Pdf = angular
  .module('pdf', [])
  .directive('ngPdf', NgPdf)
  .name;

export default Pdf;
