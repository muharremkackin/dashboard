$(document).ready(function () {
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: crudServiceBaseUrl + "/detailproducts",
                    dataType: "jsonp"
                },
                update: {
                    url: crudServiceBaseUrl + "/detailproducts/Update",
                    dataType: "jsonp"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/detailproducts/Destroy",
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            },
            batch: true,
            pageSize: 20,
            autoSync: true,
            aggregate: [{
                field: "TotalSales",
                aggregate: "sum"
            }],
            group: {
                field: "Category.CategoryName",
                dir: "desc",
                aggregates: [
                    { field: "TotalSales", aggregate: "sum" }
                ]
            },
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        Discontinued: { type: "boolean", editable: false },
                        TotalSales: { type: "number", editable: false },
                        TargetSales: { type: "number", editable: false },
                        LastSupply: { type: "date" },
                        UnitPrice: { type: "number" },
                        UnitsInStock: { type: "number" },
                        Category: {
                            defaultValue: {
                                CategoryID: 8,
                                CategoryName: "Seafood"
                            }
                        },
                        Country: {
                            defaultValue: {
                                CountryNameLong: "Bulgaria",
                                CountryNameShort: "bg"
                            }
                        }
                    }
                }
            }
        });

    $("#grid").kendoGrid({
        dataSource: dataSource,
        columnMenu: {
            filterable: false
        },
        height: "100%",
        editable: "incell",
        pageable: {
            alwaysVisible: true,
            pageSizes: [5, 10, 20, 50, 100]
        },
        sortable: true,
        navigatable: true,
        resizable: true,
        reorderable: true,
        groupable: true,
        filterable: true,
        footer: false,
        dataBound: onDataBound,
        toolbar: ["excel", "pdf", "search", "add"],
        columns: [{
            selectable: true,
            width: 75,
            attributes: {
                "class": "checkbox-align",
            },
            headerAttributes: {
                "class": "checkbox-align",
            }
        }, {
            field: "ProductName",
            title: "Product Name",
            template: "<div class='product-photo' style='background-image: url(../content/web/foods/#:data.ProductID#.jpg);'></div><div class='product-name'>#: ProductName #</div>",
            width: 300
        }, {
            field: "UnitPrice",
            title: "Price",
            format: "{0:c}",
            width: 105
        }, {
            field: "Discontinued",
            title: "In Stock",
            template: "<span id='badge_#=ProductID#' class='badgeTemplate'></span>",
            width: 130,
        }, {
            field: "Category.CategoryName",
            title: "Category",
            editor: clientCategoryEditor,
            groupHeaderTemplate: "Category: #=data.value#, Total Sales: #=kendo.format('{0:c}', aggregates.TotalSales.sum)#",
            width: 125
        }, {
            field: "CustomerRating",
            title: "Rating",
            template: "<input id='rating_#=ProductID#' data-bind='value: CustomerRating' class='rating'/>",
            editable: returnFalse,
            width: 140
        }, {
            field: "Country.CountryNameLong",
            title: "Country",
            template: "<div class='k-text-center'><img src='../content/web/country-flags/#:data.Country.CountryNameShort#.png' alt='#: data.Country.CountryNameLong#' title='#: data.Country.CountryNameLong#' width='30' /></div>",
            editor: clientCountryEditor,
            width: 120
        }, {
            field: "UnitsInStock",
            title: "Units",
            width: 105
        }, {
            field: "TotalSales",
            title: "Total Sales",
            format: "{0:c}",
            width: 140,
            aggregates: ["sum"],
        }, {
            field: "TargetSales",
            title: "Target Sales",
            format: "{0:c}",
            template: "<span id='chart_#= ProductID#' class='sparkline-chart'></span>",
            width: 220
        },
        { command: "destroy", title: "&nbsp;", width: 120 }],
    });

    $("#ChooseResellerId").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Ender KOC Arcelik", value: "1" },
            { text: "Polyester", value: "2" },
            { text: "Cotton/Polyester", value: "3" },
            { text: "Rib Knit", value: "4" }
        ],
        filter: "contains",
        suggest: true,
        index: 3,
        change: function (e) {
            console.log(e);
        }
    });
});

function createChart() {
    $("#barChart").kendoChart({
        title: false,
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            name: "Total Visits",
            data: [56000, 63000, 74000, 91000, 117000, 138000]
        }, {
            name: "Unique visitors",
            data: [52000, 34000, 23000, 48000, 67000, 83000]
        }],
        valueAxis: {
            max: 140000,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            },
            labels: {
                rotation: "auto"
            }
        },
        categoryAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            majorGridLines: {
                visible: false
            }
        },
        height: "100%",
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);
function createPieChart() {
    $("#pieChart").kendoChart({
        title: false,
        legend: {
            visible: false
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#%"
            }
        },
        series: [{
            type: "pie",
            startAngle: 150,
            data: [{
                category: "Asia",
                value: 53.8,
                color: "#9de219"
            }, {
                category: "Europe",
                value: 16.1,
                color: "#90cc38"
            }, {
                category: "Latin America",
                value: 11.3,
                color: "#068c35"
            }, {
                category: "Africa",
                value: 9.6,
                color: "#006634"
            }, {
                category: "Middle East",
                value: 5.2,
                color: "#004d38"
            }, {
                category: "North America",
                value: 3.6,
                color: "#033939"
            }]
        }],
        tooltip: {
            visible: true,
            format: "{0}%"
        }
    });
}

$(document).ready(createPieChart);
$(document).bind("kendo:skinChange", createPieChart);
function onDataBound(e) {
    var grid = this;
    grid.table.find("tr").each(function () {
        var dataItem = grid.dataItem(this);
        var themeColor = dataItem.Discontinued ? 'success' : 'error';
        var text = dataItem.Discontinued ? 'available' : 'not available';

        $(this).find(".badgeTemplate").kendoBadge({
            themeColor: themeColor,
            text: text,
        });

        $(this).find(".rating").kendoRating({
            min: 1,
            max: 5,
            label: false,
            selection: "continuous"
        });

        $(this).find(".sparkline-chart").kendoSparkline({
            legend: {
                visible: false
            },
            data: [dataItem.TargetSales],
            type: "bar",
            chartArea: {
                margin: 0,
                width: 180,
                background: "transparent"
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    format: '{0}%',
                    background: 'none'
                }
            },
            categoryAxis: {
                majorGridLines: {
                    visible: false
                },
                majorTicks: {
                    visible: false
                }
            },
            valueAxis: {
                type: "numeric",
                min: 0,
                max: 130,
                visible: false,
                labels: {
                    visible: false
                },
                minorTicks: { visible: false },
                majorGridLines: { visible: false }
            },
            tooltip: {
                visible: false
            }
        });

        kendo.bind($(this), dataItem);
    });
}

function returnFalse() {
    return false;
}

function clientCategoryEditor(container, options) {
    $('<input required name="Category">')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
                data: categories
            }
        });
}

function clientCountryEditor(container, options) {
    $('<input required name="Country">')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "CountryNameLong",
            dataValueField: "CountryNameShort",
            template: "<div class='dropdown-country-wrap'><img src='../content/web/country-flags/#:CountryNameShort#.png' alt='#: CountryNameLong#' title='#: CountryNameLong#' width='30' /><span>#:CountryNameLong #</span></div>",
            dataSource: {
                transport: {
                    read: {
                        url: " https://demos.telerik.com/kendo-ui/service/countries",
                        dataType: "jsonp"
                    }
                }
            },
            autoWidth: true
        });
}

var categories = [{
    "CategoryID": 1,
    "CategoryName": "Beverages"
}, {
    "CategoryID": 2,
    "CategoryName": "Condiments"
}, {
    "CategoryID": 3,
    "CategoryName": "Confections"
}, {
    "CategoryID": 4,
    "CategoryName": "Dairy Products"
}, {
    "CategoryID": 5,
    "CategoryName": "Grains/Cereals"
}, {
    "CategoryID": 6,
    "CategoryName": "Meat/Poultry"
}, {
    "CategoryID": 7,
    "CategoryName": "Produce"
}, {
    "CategoryID": 8,
    "CategoryName": "Seafood"
}];
