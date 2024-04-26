<template>
  <div class="row">
    <div>
      <button @click="toggleSection('ContactsForm')">
        Toggle Contacts Form
      </button>
      <button @click="toggleSection('ListValues')">Toggle List Values</button>
    </div>
    <spreadsheet ref="spreadsheet" :columns="26" :rows="36" :sheetsbar="false">
      <spreadsheet-sheet
        v-if="sections['ContactsForm'].visible"
        :name="'ContactsForm'"
        :columns="columns"
        :rows="rows"
      >
      </spreadsheet-sheet>
      <spreadsheet-sheet
        v-if="sections['ListValues'].visible"
        :name="'ListValues'"
        :rows="listRows"
      >
      </spreadsheet-sheet>
    </spreadsheet>
    <button @click="confirmSave">Save</button>
    <!-- Save button -->
  </div>
</template>
  
  <script>
import {
  Spreadsheet,
  SpreadsheetSheet,
} from "@progress/kendo-spreadsheet-vue-wrapper";
//window['$'] = window['jQuery'] = $;

export default {
  name: "App",
  components: {
    spreadsheet: Spreadsheet,
    "spreadsheet-sheet": SpreadsheetSheet,
  },
  mounted: function () {
    var spreadsheet = this.$refs.spreadsheet.kendoWidget();
    spreadsheet.element.css("height", "400px");
    spreadsheet.element.css("width", "100%");
    spreadsheet.resize();
    this.tagCells();
  },

  data: function () {
    return {
      sections: {
        ContactsForm: { visible: true },
        ListValues: { visible: true },
      },
      showModal: false,
      listRows: [
        {
          cells: [
            {
              value: true,
            },
            {
              value: false,
            },
          ],
        },
      ],
      rows: [
        {
          height: 25,
          cells: [
            {
              value: "",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
            {
              value: "Email",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
            {
              value: "Date of Birth",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
            {
              value: "Phone",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
            {
              value: "Maths Marks",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
            {
              value: "Science Marks",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
            {
              value: "Total Marks",
              background: "rgb(167,214,255)",
              textAlign: "center",

              enable: false,
            },
          ],
        },
        {
          height: 25,
          cells: [
            {
              value: "",
              validation: {
                dataType: "custom",
                from: "AND(LEN(A3)>3, LEN(A3)<200)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Full Name validation error",
                messageTemplate:
                  "The full name should be longer than 3 letters and shorter than 200.",
              },
            },
            {
              value: "maria.anders@mail.com",
              validation: {
                dataType: "custom",
                from: 'AND(NOT(ISERROR(FIND("@", B3))), NOT(ISERROR(FIND(".", B3))), ISERROR(FIND(" ", J1)), LEN(B3)>5)',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Email validation error",
                messageTemplate:
                  "The value entered is not an valid email address.",
              },
            },
            {
              value: 31232,
              format: "M/d/yyyy",
              validation: {
                dataType: "date",
                showButton: true,
                comparerType: "between",
                from: 'DATEVALUE("1/1/1900")',
                to: 'DATEVALUE("1/1/1998")',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Birth Date validaiton error",
                messageTemplate:
                  "Birth Date should be between 1899 and 1998 year.",
              },
            },
            {
              value: 921123465,
              validation: {
                dataType: "custom",
                from: "AND(ISNUMBER(D2),LEN(D2)=10)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 44,
            },
            {
              value: 45,
            },
            {
              formula: "E2+F2",
              format: "$#,##0.00",
            },
          ],
        },
        {
          height: 25,
          cells: [
            {
              value: "Ana Trujillo",
              validation: {
                dataType: "custom",
                from: "AND(LEN(A4)>3, LEN(A4)<200)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Full Name validation error",
                messageTemplate:
                  "The full name should be longer than 3 letters and shorter than 200.",
              },
            },
            {
              value: "ana.trujillo@mail.com",
              validation: {
                dataType: "custom",
                from: 'AND(NOT(ISERROR(FIND("@", B4))), NOT(ISERROR(FIND(".", B4))), ISERROR(FIND(" ", J1)), LEN(B4)>5)',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Email validation error",
                messageTemplate:
                  "The value entered is not an valid email address.",
              },
            },
            {
              value: 31222,
              format: "M/d/yyyy",
              validation: {
                dataType: "date",
                showButton: true,
                comparerType: "between",
                from: 'DATEVALUE("1/1/1900")',
                to: 'DATEVALUE("1/1/1998")',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Birth Date validaiton error",
                messageTemplate:
                  "Birth Date should be between 1899 and 1998 year.",
              },
            },
            {
              value: 447414,
              validation: {
                dataType: "custom",
                from: "AND(ISNUMBER(D3),LEN(D3)=10)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 44,
            },
            {
              value: 45,
            },
            {
              formula: "E2+F2",
              format: "$#,##0.00",
            },
          ],
        },
        {
          height: 25,
          cells: [
            {
              value: "Antonio Moreno",
              validation: {
                dataType: "custom",
                from: "AND(LEN(A5)>3, LEN(A5)<200)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Full Name validation error",
                messageTemplate:
                  "The full name should be longer than 3 letters and shorter than 200.",
              },
            },
            {
              value: "antonio.moreno@mail.com",
              validation: {
                dataType: "custom",
                from: 'AND(NOT(ISERROR(FIND("@", B5))), NOT(ISERROR(FIND(".", B5))), ISERROR(FIND(" ", J1)), LEN(B5)>5)',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Email validation error",
                messageTemplate:
                  "The value entered is not an valid email address.",
              },
            },
            {
              value: 32232,
              format: "M/d/yyyy",
              validation: {
                dataType: "date",
                showButton: true,
                comparerType: "between",
                from: 'DATEVALUE("1/1/1900")',
                to: 'DATEVALUE("1/1/1998")',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Birth Date validaiton error",
                messageTemplate:
                  "Birth Date should be between 1899 and 1998 year.",
              },
            },
            {
              value: "(5) 555-3932",
              validation: {
                dataType: "custom",
                from: "AND(ISNUMBER(D5),LEN(D5)<14)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 88,
            },
            {
              value: 77,
            },
            {
              formula: "E4+F4",
              format: "$#,##0.00",
            },
          ],
        },
        {
          height: 25,
          cells: [
            {
              value: "Thomas Hardy",
              validation: {
                dataType: "custom",
                from: "AND(LEN(A6)>3, LEN(A6)<200)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Full Name validation error",
                messageTemplate:
                  "The full name should be longer than 3 letters and shorter than 200.",
              },
            },
            {
              value: "thomas.hardy@mail.com",
              validation: {
                dataType: "custom",
                from: 'AND(NOT(ISERROR(FIND("@", B6))), NOT(ISERROR(FIND(".", B6))), ISERROR(FIND(" ", J1)), LEN(B6)>5)',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Email validation error",
                messageTemplate:
                  "The value entered is not an valid email address.",
              },
            },
            {
              value: 21232,
              format: "M/d/yyyy",
              validation: {
                dataType: "date",
                showButton: true,
                comparerType: "between",
                from: 'DATEVALUE("1/1/1900")',
                to: 'DATEVALUE("1/1/1998")',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Birth Date validaiton error",
                messageTemplate:
                  "Birth Date should be between 1899 and 1998 year.",
              },
            },
            {
              value: 1715557788,
              validation: {
                dataType: "custom",
                from: "AND(ISNUMBER(D6),LEN(D6)=10)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 11,
            },
            {
              value: 22,
            },
            {
              formula: "E5+F5",
              format: "$#,##0.00",
            },
          ],
        },
        {
          height: 25,
          cells: [
            {
              value: "Christina Toms",
              validation: {
                dataType: "custom",
                from: "AND(LEN(A7)>3, LEN(A7)<200)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Full Name validation error",
                messageTemplate:
                  "The full name should be longer than 3 letters and shorter than 200.",
              },
            },
            {
              value: "christina.toms",
              validation: {
                dataType: "custom",
                from: 'AND(NOT(ISERROR(FIND("@", B7))), NOT(ISERROR(FIND(".", B7))), ISERROR(FIND(" ", J1)), LEN(B7)>5)',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Email validation error",
                messageTemplate:
                  "The value entered is not an valid email address.",
              },
            },
            {
              value: 30102,
              format: "M/d/yyyy",
              validation: {
                dataType: "date",
                showButton: true,
                comparerType: "between",
                from: 'DATEVALUE("1/1/1900")',
                to: 'DATEVALUE("1/1/1998")',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Birth Date validaiton error",
                messageTemplate:
                  "Birth Date should be between 1899 and 1998 year.",
              },
            },
            {
              value: 921123465,
              validation: {
                dataType: "custom",
                from: "AND(ISNUMBER(D7),LEN(D7)<14)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 44,
            },
            {
              value: 45,
            },
            {
              formula: "E6+F6",
              format: "$#,##0.00",
            },
          ],
        },
        {
          height: 25,
          cells: [
            {
              value: "",
              validation: {
                dataType: "custom",
                from: "AND(LEN(A9)>3, LEN(A9)<200)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Full Name validation error",
                messageTemplate:
                  "The full name should be longer than 3 letters and shorter than 200.",
              },
            },
            {
              value: "",
              validation: {
                dataType: "custom",
                from: 'AND(NOT(ISERROR(FIND("@", B9))), NOT(ISERROR(FIND(".", B9))), ISERROR(FIND(" ", J1)), LEN(B9)>5)',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Email validation error",
                messageTemplate:
                  "The value entered is not an valid email address.",
              },
            },
            {
              value: "",
              format: "M/d/yyyy",
              validation: {
                dataType: "date",
                showButton: true,
                comparerType: "between",
                from: 'DATEVALUE("1/1/1900")',
                to: 'DATEVALUE("1/1/1998")',
                allowNulls: true,
                type: "reject",
                titleTemplate: "Birth Date validaiton error",
                messageTemplate:
                  "Birth Date should be between 1899 and 1998 year.",
              },
            },
            {
              value: "",
              validation: {
                dataType: "custom",
                from: "AND(ISNUMBER(D9),LEN(D9)<14)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 44,
              validation: {
                dataType: "custom",
                from: "ISNUMBER(D3)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              value: 45,
              validation: {
                dataType: "custom",
                from: "ISNUMBER(D3)",
                allowNulls: true,
                type: "reject",
                titleTemplate: "Phone validation error",
                messageTemplate:
                  "The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.",
              },
            },
            {
              formula: "E7+F7",
              format: "$#,##0.00",
            },
          ],
        },
      ],
      columns: [
        {
          width: 100,
        },
        {
          width: 215,
        },
        {
          width: 115,
        },
        {
          width: 115,
        },
        {
          width: 115,
        },
      ],
    };
  },
  methods: {
    toggleSection(sectionName) {
      debugger;
      this.sections[sectionName].visible = !this.sections[sectionName].visible;
    },
    tagCells() {
      this.rows.forEach((row) => {
        row.cells.forEach((cell) => {
          //console.log(cell);
          if (
            cell.value === undefined ||
            cell.value === null ||
            cell.value === ""
          ) {
            console.log(cell.value);
            cell.background = "red";
          }
        });
      });
    },
    confirmSave() {
      debugger;
      // Retrieve the spreadsheet instance
      const spreadsheet = this.$refs.spreadsheet.kendoWidget();

      // Retrieve the full data of the spreadsheet, including validation rules and formulas
      const fullData = spreadsheet.toJSON();

      // Extract values, validation rules, formulas, etc. from the full data
      const sheets = fullData.sheets;
      const rowData = [];

      // Iterate over each sheet
      sheets.forEach((sheet) => {
        // Iterate over rows
        sheet.rows.forEach((row) => {
          // Extract row data
          const rowDataItem = {
            index: row.index, // Row index
            cells: [], // Array to hold cell data in this row
          };

          // Iterate over cells in the row
          row.cells.forEach((cell) => {
            // Extract cell data
            const cellInfo = {
              value: cell.value,
              validation: cell.validation,
              formula: cell.formula,
              // Add other properties you need here
            };

            // Push cell data to the row's cells array
            rowDataItem.cells.push(cellInfo);
          });

          // Push the row data to the rowData array
          rowData.push(rowDataItem);
        });
      });

      // Now you have rowData array containing objects for each row, where each object contains cells data
      console.log(rowData);
    },
  },
};
</script>