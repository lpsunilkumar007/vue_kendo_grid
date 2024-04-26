<template>
  <div class="row">
    <div class="col-md-12 k-card-list">
      <Card id="profile">
        <CardHeader class="h6">Method A</CardHeader>
        <CardBody>
          <div class="row">
            <div class="col-md-9">
              <div class="form-group row">
                <KLabel class="col-md-6 h6"
                  >Total fixed overheads for preceding year</KLabel
                >
                <div class="col-md-6">
                  <KInput :type="'text'" id="fixed_overheads" />
                </div>
              </div>
              <div class="form-group row">
                <KLabel class="col-md-6 h6"
                  >Own funds requirement (10% of fixed overheads for preceding
                  year)</KLabel
                >
                <div class="col-md-6">
                  <KInput type="text" id="own_funds" />
                </div>
              </div>
              <div class="form-group row">
                <KLabel class="col-md-6 h6"
                  >Total capital requirement (higher of initial capital and own
                  funds requirement)</KLabel
                >
                <div class="col-md-6">
                  <KInput type="email" id="total_capital" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card id="eligible-capital">
        <CardHeader class="h6"
          >Eligible Capital for calculating Own Funds</CardHeader
        >
        <CardBody>
          <div class="row">
            <div class="col-md-9">
              <div class="form-group">
                <div class="row">
                  <KLabel class="col h6 mt-24">CET1 Capital</KLabel>
                  <div class="col">
                    <KLabel>Total Amount</KLabel>
                    <KInput :type="'text'" id="cet_capital" readonly />
                  </div>
                  <div class="col">
                    <KLabel>Eligible Amount</KLabel>
                    <KInput :type="'text'" id="cet_capital_2" />
                  </div>
                  <div class="col">
                    <KLabel>Excess</KLabel>
                    <KInput :type="'text'" id="cet_capital_3" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <KLabel class="col h6">AT1 Capital</KLabel>
                  <div class="col">
                    <KInput :type="'text'" id="at1_capital" readonly />
                  </div>
                  <div class="col">
                    <KInput :type="'text'" id="at1_capital_2" />
                  </div>
                  <div class="col">
                    <KInput :type="'text'" id="at1_capital_3" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <KLabel class="col h6">Tier 1 Capital</KLabel>
                  <div class="col">
                    <KInput :type="'text'" id="tier1_capital" readonly />
                  </div>
                  <div class="col">
                    <KInput :type="'text'" id="tier1_capital_2" />
                  </div>
                  <div class="col">
                    <KInput :type="'text'" id="tier1_capital_3" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <KLabel class="col h6">T2 Capital</KLabel>
                  <div class="col">
                    <KInput :type="'text'" id="t2_capital" readonly />
                  </div>
                  <div class="col">
                    <KInput :type="'text'" id="t2_capital_2" />
                  </div>
                  <div class="col">
                    <KInput :type="'text'" id="t2_capital_3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <div>
      <Card id="con_deatils" class="mt-24">
        <CardHeader class="h6">Controller Details</CardHeader>
        <CardBody>
          <Grid
            ref="grid"
            :style="{ height: '440px' }"
            :data-items="gridData"
            :edit-field="'inEdit'"
            :sortable="true"
            :pageable="pageable"
            :take="take"
            :skip="skip"
            :total="total"
            @itemchange="itemChange"
            @datastatechange="dataStateChange"
            :columns="columns"
          >
            <template v-slot:myTemplate="{ props }">
              <custom
                :data-item="props.dataItem"
                @edit="edit"
                @save="save"
                @remove="remove"
                @cancel="cancel"
              />
            </template>
            <template v-slot:numericCell="{ props }">
              <numericCell
                ref="numericCell"
                :data-item="props.dataItem"
                :field="props.field"
                :validRange="unitsFieldValueIsInRange"
                :valueNotEmpty="unitsFieldHasValue"
                @change="(e) => validate(props.dataItem)"
              />
            </template>
            <template v-slot:inputCell="{ props }">
              <inputCell
                :data-item="props.dataItem"
                :field="props.field"
                :validLength="productNameFieldLengthaboveThree"
                @change="(e) => validate(props.dataItem)"
              />
            </template>
            <grid-toolbar>
              <kbutton title="Add new" :theme-color="'primary'" @click="insert">
                Add new
              </kbutton>
              <kbutton
                v-if="hasItemsInEdit"
                title="Cancel current changes"
                @click="cancelChanges"
              >
                Cancel current changes
              </kbutton>
            </grid-toolbar>
            <grid-norecords> There is no data available custom </grid-norecords>
          </Grid>
        </CardBody>
      </Card>

      <Card id="e-money_trans" class="mt-24">
        <CardHeader class="h6">E-money payment transactions</CardHeader>
        <CardBody>
          <CollapsibleSection title="Total e-money payment transactions">
          </CollapsibleSection>
          <CollapsibleSection
            class="mt-24"
            title="Via remote payment initiation channel"
          >
          </CollapsibleSection>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<script>
import { FieldWrapper } from "@progress/kendo-vue-form";

import { Button } from "@progress/kendo-vue-buttons";
import { Dialog, DialogActionsBar, Window } from "@progress/kendo-vue-dialogs";
import { Input, Checkbox, Switch } from "@progress/kendo-vue-inputs";
import { Label } from "@progress/kendo-vue-labels";
import { Card, CardHeader, CardBody, Avatar } from "@progress/kendo-vue-layout";
import { Grid, GridToolbar, GridNoRecords } from "@progress/kendo-vue-grid";
import { process } from "@progress/kendo-data-query";
import CommandCell from "./CommandCell.vue";
import CollapsibleSection from "./CollapsibleSection.vue";
import {
  unitsFieldHasValue,
  unitsFieldValueIsInRange,
  isLengthAboveThree,
} from "../../shared/Survey/verificationFunctions";
import sampleProducts from "../../shared/Survey/product";
import NumericCell from "./NumericCell.vue";
import InputCell from "./InputCell.vue";
import { Upload } from "@progress/kendo-vue-upload";

// Replace with a personal access token to access your repositories.
// See https://github.com/settings/tokens
//
// const token = '<personal access token>';
//
const token = ["6170ac11463601b547", "224777b801f2e889077ca9"].join("");
const fileStatuses = [
  "UploadFailed",
  "Initial",
  "Selected",
  "Uploading",
  "Uploaded",
  "RemoveFailed",
  "Removing",
];

/* global kendo */
export default {
  name: "survey",
  components: {
    Window,
    Dialog,
    DialogActionsBar,
    Switch,
    KButton: Button,
    KInput: Input,
    Card,
    CardHeader,
    CardBody,
    Avatar,
    KLabel: Label,
    FieldWrapper,
    Checkbox,
    Grid: Grid,
    "grid-toolbar": GridToolbar,
    "grid-norecords": GridNoRecords,
    custom: CommandCell,
    kbutton: Button,
    CollapsibleSection,
    numericCell: NumericCell,
    inputCell: InputCell,
    upload: Upload,
  },
  data: function () {
    return {
      rows: [
        [1, "John", "Doe"],
        [2, "Jane", "Smith"],
        [3, "Alice", "Johnson"],
      ],
      columns: [
        { field: "id", title: "ID" },
        { field: "firstName", title: "First Name" },
        { field: "lastName", title: "Last Name" },
      ],
      files: [],
      filePreviews: {},
      events: [],
      selectedFile: null,
      filter: null,
      sort: null,
      pageable: true,
      gridData: [],
      skip: 0,
      take: 10,
      total: 10,
      updatedData: [],
      editID: null,
      columns: [
        {
          field: "ProductID",
          filterable: false,
          editable: false,
          title: "ID",
          width: "50px",
        },
        {
          field: "ControllerName",
          title: "Name of Controller",
          width: "150px",
          cell: "inputCell",
        },
        {
          field: "UnitsInStock",
          title: "% Voting power",
          width: "150",
          cell: "numericCell",
        },
        {
          field: "UnitsInStock",
          title: "% Shareholding",
          width: "150px",
          cell: "numericCell",
        },
        {
          field: "ProductName",
          title: "Is the controller a Body corporate or Individual?",
          width: "200px",
          cell: "inputCell",
        },
        { cell: "myTemplate", filterable: false },
      ],
      gridData: [],
      unitsFieldHasValue: true,
      unitsFieldValueIsInRange: true,
      productNameFieldLengthaboveThree: true,
    };
  },
  computed: {
    hasItemsInEdit() {
      return this.gridData.filter((p) => p.inEdit).length > 0;
    },
  },
  created: function () {
    this.updatedData = sampleProducts;
    this.getData();
  },
  methods: {
    //#region Upload
    //Add file
    onAdd(event) {
      const afterStateChange = () => {
        event.affectedFiles
          .filter((file) => !file.validationErrors)
          .forEach((file) => {
            const reader = new FileReader();
            debugger;
            reader.onloadend = (ev) => {
              this.filePreviews[file.uid] = ev.target.result;
            };
            reader.readAsDataURL(file.getRawFile());
          });
      };
      this.files = event.newState;
      this.events.push(`File selected: ${event.affectedFiles[0].name}`);
      afterStateChange();
    },

    //Remove file
    onRemove(event) {
      const filePreviews = {
        ...this.filePreviews,
      };

      event.affectedFiles.forEach((file) => {
        delete filePreviews[file.uid];
      });

      this.files = event.newState;
      this.events.push(`File removed: ${event.affectedFiles[0].name}`);
      this.filePreviews = filePreviews;
    },

    //File process
    onProgress(event) {
      this.files = event.newState;
      this.events.push(`On Progress: ${event.affectedFiles[0].progress} %`);
    },

    //File status
    onStatusChange(event) {
      const file = event.affectedFiles[0];

      this.files = event.newState;
      this.events.push(
        `File '${file.name}' status changed to: ${fileStatuses[file.status]}`
      );
    },
    //#endregion

    itemChange: function (e) {
      if (e.dataItem.ProductID) {
        let index = this.gridData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
        let updated = Object.assign({}, this.gridData[index], {
          [e.field]: e.value,
        });
        this.gridData.splice(index, 1, updated);
      } else {
        e.dataItem[e.field] = e.value;
      }
    },
    validate: function (dataItem) {
      const unitsInStockValue = dataItem.UnitsInStock;
      const productNameValue = dataItem.ProductName;

      this.unitsFieldHasValue = unitsFieldHasValue(unitsInStockValue);
      this.unitsFieldValueIsInRange =
        unitsFieldValueIsInRange(unitsInStockValue);
      this.productNameFieldLengthaboveThree =
        isLengthAboveThree(productNameValue);
      return (
        this.unitsFieldHasValue &&
        this.unitsFieldValueIsInRange &&
        this.productNameFieldLengthaboveThree
      );
    },
    insert: function () {
      debugger;
      const dataItem = { inEdit: true };
      const newproducts = this.gridData.slice();
      this.gridData.splice(0, 0, dataItem);
    },
    edit: function (e) {
      let index = this.gridData.findIndex(
        (p) => p.ProductID === e.dataItem.ProductID
      );
      let updated = Object.assign({}, this.gridData[index], { inEdit: true });
      this.gridData.splice(index, 1, updated);
    },
    save: function (e) {
      debugger;
      if (this.validate(e.dataItem)) {
        let index = this.gridData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
        let item = this.gridData[index];
        let updated = Object.assign(
          this.update(this.gridData.slice(), item, false),
          { inEdit: undefined }
        );
        this.gridData.splice(index, 1, updated);
        let updateDataIndex = this.updatedData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
        this.updatedData.splice(updateDataIndex, 1, updated);
      }
    },
    update(data, item, remove) {
      let updated;
      let index = data.findIndex(
        (p) => item.ProductID && p.ProductID === item.ProductID
      );
      if (index >= 0) {
        updated = Object.assign({}, item);
        data[index] = updated;
      } else {
        let id = 1;
        this.updatedData.forEach((p) => {
          if (p.ProductID) {
            id = Math.max(p.ProductID + 1, id);
          }
        });
        updated = Object.assign({}, item, { ProductID: id });

        data.unshift(updated);
        index = 0;
      }

      if (remove) {
        data = data.splice(index, 1);
      }
      return data[index];
    },
    cancel(e) {
      if (e.dataItem.ProductID) {
        let index = this.gridData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
        let updateDataIndex = this.updatedData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
        let updated = Object.assign(this.updatedData[updateDataIndex], {
          inEdit: undefined,
        });
        this.gridData.splice(index, 1, updated);
      } else {
        let index = this.gridData.findIndex(
          (p) => JSON.stringify(e.dataItem) === JSON.stringify(p)
        );

        this.gridData.splice(index, 1);
      }
    },
    remove(e) {
      e.dataItem.inEdit = undefined;
      this.update(this.gridData, e.dataItem, true);
      this.update(this.updatedData, e.dataItem, true);
      this.gridData = this.gridData.slice();
    },
    cancelChanges() {
      let editedItems = this.updatedData.filter((p) => p.inEdit === true);
      if (editedItems.length) {
        editedItems.forEach((item) => {
          item.inEdit = undefined;
        });
      }
      this.getData();
    },
    getData: function () {
      this.gridData = process(this.updatedData, {
        take: this.take,
        skip: this.skip,
        sort: this.sort,
        filter: this.filter,
      }).data;

      this.total = process(this.updatedData, {
        filter: this.filter,
      }).total;
    },
    createAppState: function (dataState) {
      this.take = dataState.take;
      this.skip = dataState.skip;
      this.filter = dataState.filter;
      this.sort = dataState.sort;
      this.getData();
    },
    dataStateChange: function (event) {
      this.createAppState(event.data);
    },
  },
};
</script>

