const PdfPrinter = require('pdfmake');
const fs = require('fs');

const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')

module.exports = {
  // @desc    Get Reports Summary
  // @route   GET /report/reports-summary
  getReportsSummary: async (req, res) => {
    const fonts = {
      Roboto: {
        normal: './public/fonts/Roboto-Regular.ttf',
        bold: './public/fonts/Roboto-Medium.ttf',
        italics: './public/fonts/Roboto-Italic.ttf',
        bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
      }
    };
    
    const printer = new PdfPrinter(fonts);
    
    const signInSheet = {
      content: [
        { text: 'Tables', style: 'header' },
        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
        { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        },
      ]
    }

    const rollCallSheet = {
      content: [
        { text: 'Tables', style: 'header' },
        'This is the text for the Roll Call Sheet.',
        { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        },
      ]
    }

    const signIn = printer.createPdfKitDocument(signInSheet);
    const rollCall = printer.createPdfKitDocument(rollCallSheet);
    signIn.pipe(fs.createWriteStream('./public/reports/sign-in-sheet.pdf'));
    rollCall.pipe(fs.createWriteStream('./public/reports/roll-call-sheet.pdf'));
    signIn.end();
    rollCall.end();

    try {
      res.render('reports-summary-admin.ejs')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Download Sign In Sheets
  // @route   GET /report/sign-in-sheets
  createSignInSheets: async (req, res) => {
    try {
      res.download('./public/reports/sign-in-sheet.pdf')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

  // @desc    Download Roll Call Sheets
  // @route   GET /report/roll-call-sheets
  createRollCallSheets: async (req, res) => {
    try {
      res.download('./public/reports/roll-call-sheet.pdf')
    } catch (error) {
      console.error(error)
      // res.render('error/500')
    }
  },

}