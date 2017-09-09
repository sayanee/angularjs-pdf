import angular from 'angular';
import { NgPdf } from './angular-pdf.directive'
import { NgPdfFactory } from './angular-pdf.factory'

export const Pdf = angular
  .module('pdf', [])
  .directive('ngPdf', NgPdf)
  .factory('NgPdfFactory', NgPdfFactory)
  .name;

export default Pdf;
