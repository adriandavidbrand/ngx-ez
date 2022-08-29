The ez table is a collection of components for showing grids of data in a table.

```html
<ez-table [data]="data" tableId="uniqueTableId" pageSize="10">
  <ez-table-search></ez-table-search>
  <ez-column
    heading="Heading text"
    property="propertyOfItemForColumn"
  ></ez-column>
  <ez-column heading="Date" property="date" type="date"></ez-column>
  <ez-column
    heading="Price"
    property="price"
    type="currency"
    cellClass="text-right"
  >
  </ez-column>
  <ez-column
    heading="Number of units"
    property="units"
    type="number"
    cellClass="text-right"
  >
  </ez-column>
  <ez-column [sortable]="false">
    <ng-template let-item>
      <button (click)="delete(item)">delete</button>
    </ng-template>
  </ez-column>
  <ez-table-pager footer></ez-table-pager>
</ez-table>
```

ez-table is the parent component that takes a property data which is a plain JavaScript object. Each table should have a
unique table id so the aria tags point to the right table. If no table id is provided a random id will be generated.

An optional ez-table-search control can be added that shows a search box that filters the data to show only rows that
contain the search string.

You can also set the property pageSize for the number records to show per page, the default is to show all records. If
you do set a pageSize then you will need to place a control that shows paging controls inside the table. The default
ez-table-pager can be used for the paging controls. To make the pager display under table data mark it with the footer
selector.

Only a single element can be marked with the footer selector for content that is to be displayed after the table. If you
need more than a single item shown in the footer you can mark a parent container with the footer selector and add
content to it. The following will show both the search and pager controls below the table.

```html
<ng-container footer>
  <ez-table-search></ez-table-search>
  <ez-table-pager></ez-table-pager>
</ng-container>
```

There is an event emitter rowClick that can be used to add a click event handler to the table row.

```html
<ez-table [data]="data" (rowClick)="myRowClickEventHander($event)"></ez-table>
```

This will pass the current item to the method myRowClickEventHandler on your components class when the user clicks on a
table row.

# H2 Columns

To add a column to the table use the ez-column component

The column component supports the following properties

heading: the text that will display in the header for that column

property: the name of the property on the data object. Property supports using . notation for resolving properties on
sub objects such as “subObjectProperty.name“.

type: date, number or currency will cause the column to form the data.

dateFormat: default 'dd/MM/yyy'

display: a function that take the current item in the array and outputs a string to display

sort: a standard JavaScript sort function that compare the property in the format

```Javascript
(a, b) => a < b ? -1 : a> b ? 1 : 0;
```

headingId: the id of the th on the column, useful if you have input boxes without labels and use the header as the
label

There is an event emitter cellClick that can be used to add a click event handler to the table cell.

```html
<ez-column (cellClick)="myCellClickEventHandler($event)"></ez-column>
```

This will pass the current item to the method myCellClickEventHandler on your components class when the use clicks
on a table cell in this column.

# H2 Search property

When the serach property on the table is set the data in the table will be filtered to only rows where at least one of the properties from the columns matches the search string. This will happen in real time at the property cahnges so can be wired up to a textbox like

```html
<input name="search" (keyup)="search = $any($event.target).value" />
<ez-table [data]="data" [search]="search"></ez-table>
```

As the user types into the search box the data would filter on each keystroke.

# H2 Footer

ez-footer component adds footer entries to the columns footer. The footer component has the following properties.

value: a string to display in the footer cell;
cellClass: the css class of the cell;
display: a in the format (pageData: any[], data: any[]) => string; where pageData is the current data displayed in
the table and data is the full unfiltered data. Useful for calculating totals.
columns: the number of columns to span;
template: a template that can display custom info. Template variables you can set are data, pageData and search.
data is the full data set, pageData is the current filtered results and search is the current search string.

```html
<ez-table [data]="data" pageSize="10">
  <ez-table-search></ez-table-search>
  <ez-column heading="Date" property="date" type="date"></ez-column>
  <ez-column heading="Qty" property="qty" type="number"></ez-column>
  <ez-column heading="Price" property="date" type="price"></ez-column>
  <ez-column heading="Total">
    <ng-template let-item>
      {{ (item.qty * item.price) | currency }}
    </ng-template>
  </ez-column>
  <ez-footer columns="3"> </ez-footer>
  <ez-footer>
    <ng-template let-pageData="pageData">
      {{ pageData | calcTotal | currency }}
    </ng-template>
  </ez-footer>
  <ez-table-pager footer></ez-table-pager>
</ez-table>
```

In this example we have an empty footer that spans 3 columns to make the total column the last column then we assign
the current pageData to a view variable so we can pass it to a calcTotal pipe. It is important that we use a pipe in
such an expensive operation such as calculating a total from an array as a calcTotal function on the component would
run on every changeDetetion.
