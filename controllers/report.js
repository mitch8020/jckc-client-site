const PdfPrinter = require('pdfmake');
const fs = require('fs');
const moment = require('moment');

const User = require('../models/User')
const Student = require('../models/Student')
const Classroom = require('../models/Classroom')

module.exports = {
  // @desc    Get Reports Summary
  // @route   GET /report/reports-summary
  getReportsSummary: async (req, res) => {
    try {
      let students = await Student.find()
      students = students.sort((a,b) => (a.studentLastName).localeCompare(b.studentLastName))

      let classrooms = await Classroom.find()
      classrooms = classrooms.sort((a,b) => (a.classroomName).localeCompare(b.classroomName))
      .sort((a,b) => {
        if ((a.ageGroup == 'infant' && b.ageGroup == 'toddler') || (a.ageGroup == 'toddler' && b.ageGroup == 'preschool')) {
          return -1
        } else if ((a.ageGroup == 'preschool' && b.ageGroup == 'toddler') || (a.ageGroup == 'toddler' && b.ageGroup == 'infant')) {
          return 1
        } else {
          return 0
        }
      })

      let today = new Date()
      today = `Date: __________`
      let week = 'Week of ___ /___ to ___ /___'

      const fonts = {
        Roboto: {
          normal: './public/fonts/Roboto-Regular.ttf',
          bold: './public/fonts/Roboto-Medium.ttf',
          italics: './public/fonts/Roboto-Italic.ttf',
          bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
        }
      };
      
      const printer = new PdfPrinter(fonts);
      
      let signInPages = classrooms.map((e,i) => {
        let firstPageHeader = { text: 'JC KIDZ CLUBHOUSE', style: 'header', alignment: 'center' }
        let otherPageHeader = { text: 'JC KIDZ CLUBHOUSE', pageBreak: 'before', style: 'header', alignment: 'center' }
        return [
          ( i == 0 ? firstPageHeader : otherPageHeader ),
          { text: '408 W Market St, Johnson City, TN 37604', alignment: 'center' },
          {
            style: 'tableExample',
            table: {
              widths: ['*','*'],
              body: [
                [
                  { text: today, style: 'subheader', border: [false, false, false, false] },
                  { text: `Classroom: ${e.classroomName}`, style: 'subheader', alignment: 'right', border: [false, false, false, false] },
                ],
                [
                  { text: `Age Group: __________`, style: 'subheader', border: [false, false, false, false] },
                  { text: `Teacher: ${e.teacherName}`, style: 'subheader', alignment: 'right', border: [false, false, false, false] },
                ],
              ]
            }
          },
          {
            style: 'tableExample',
            table: {
              heights: 22,
              widths: ['*',125,60,80,125,60,80],
              body: signInTable(e)
            }
          },
        ]
      })

      function signInTable (room) {
        let table = [
          [
            {}, {text: 'IN', style: 'tableHeader', colSpan: 3, 
            alignment: 'center'}, {}, {}, 
            {text: 'OUT', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {}, {} 
          ],
          [
            {text: 'STUDENT NAME', style: 'tableHeader',
            alignment: 'center'}, {text: 'PARENT / GUARDIAN PRINTED NAME', style: 'tableHeader',
            alignment: 'center'}, {text: 'TIME', style: 'tableHeader',
            alignment: 'center'}, {text: 'SIGNATURE', style: 'tableHeader',
            alignment: 'center'},
            {text: 'PARENT / GUARDIAN PRINTED NAME', style: 'tableHeader', alignment: 'center'}, {text: 'TIME', style: 'tableHeader',
            alignment: 'center'}, {text: 'SIGNATURE', style: 'tableHeader',
            alignment: 'center'},
          ]
        ]
        students.forEach(e => {
          if (e.classroom == room.id) {
            let studentRow = [
              [
                { text: `${e.studentFirstName} ${e.studentLastName}`, style: 'studentrow' },
                {},{},{},{},{},{}]
            ]
            table = table.concat(studentRow)
          }
        })
        return table
      }

      const signInSheet = {
        pageOrientation: 'landscape',
        content: signInPages.reduce((p,a) => p.concat(a)),
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          tableExample: {
            margin: [0, 0, 0, 0]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
      }

      let rollCallPages = classrooms.map((e,i) => {
        let firstPageHeader = { text: 'JC KIDZ CLUBHOUSE', style: 'header', alignment: 'center' }
        let otherPageHeader = { text: 'JC KIDZ CLUBHOUSE', pageBreak: 'before', style: 'header', alignment: 'center' }
        return [
          ( i == 0 ? firstPageHeader : otherPageHeader ),
          {
            style: 'tableExample',
            table: {
              widths: ['*','*'],
              body: [
                [
                  { text: week, style: 'subheader', border: [false, false, false, false] },
                  { text: `Classroom: ${e.classroomName}`, style: 'subheader', alignment: 'right', border: [false, false, false, false] },
                ],
                [
                  { text: `Age Group: __________`, style: 'subheader', border: [false, false, false, false] },
                  { text: `Teacher: ${e.teacherName}`, style: 'subheader', alignment: 'right', border: [false, false, false, false] },
                ],
              ]
            }
          },
          {
            style: 'tableExample',
            table: {
              heights: 22,
              widths: [100,20,28,20,28,20,28,20,28,20,28,'auto'],
              body: rollCallTable(e)
            }
          },
        ]
      })

      function rollCallTable (room) {
        let table = [
          [
            { text: 'STUDENT NAME', alignment: 'center' },
            { text: 'MON', alignment: 'center', colSpan: 2 },{},
            { text: 'TUE', alignment: 'center', colSpan: 2 },{},
            { text: 'WED', alignment: 'center', colSpan: 2 },{},
            { text: 'THU', alignment: 'center', colSpan: 2 },{},
            { text: 'FRI', alignment: 'center', colSpan: 2 },{},
            { text: 'COMMENTS', alignment: 'center' },
          ],
        ]
        students.forEach(e => {
          if (e.classroom == room.id) {
            let studentRow = [
              [
                { text: `${e.studentFirstName} ${e.studentLastName} \n DOB: ${moment(e.dateOfBirth).utc().format('L')}`, style: 'studentrow', rowSpan: 2 },
                { text: 'IN', style: 'subsubheader', alignment: 'center' },{},
                { text: 'IN', style: 'subsubheader', alignment: 'center' },{},
                { text: 'IN', style: 'subsubheader', alignment: 'center' },{},
                { text: 'IN', style: 'subsubheader', alignment: 'center' },{},
                { text: 'IN', style: 'subsubheader', alignment: 'center' },{},
                { text: '', rowSpan: 2 }
              ],
              [
                {},
                { text: 'OUT', style: 'subsubheader', alignment: 'center' },{},
                { text: 'OUT', style: 'subsubheader', alignment: 'center' },{},
                { text: 'OUT', style: 'subsubheader', alignment: 'center' },{},
                { text: 'OUT', style: 'subsubheader', alignment: 'center' },{},
                { text: 'OUT', style: 'subsubheader', alignment: 'center' },{},
                {}
              ]
            ]
            table = table.concat(studentRow)
          }
        })
        return table
      }

      const rollCallSheet = {
        content: rollCallPages.reduce((p,a) => p.concat(a)),
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          subsubheader: {
            fontSize: 8,
            bold: true,
          },
          tableExample: {
            margin: [0, 0, 0, 0]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          studentrow: {
            fontSize: 10,
          }
        },
      }

      const signIn = printer.createPdfKitDocument(signInSheet);
      const rollCall = printer.createPdfKitDocument(rollCallSheet);
      signIn.pipe(fs.createWriteStream('./public/reports/sign-in-sheet.pdf'));
      rollCall.pipe(fs.createWriteStream('./public/reports/roll-call-sheet.pdf'));
      signIn.end();
      rollCall.end();

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