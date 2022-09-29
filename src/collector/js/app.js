$(function () {
    $('body').on('click', 'button', function () {
        let button = $(this);
        button.addClass('animate__bounceIn');
        setTimeout(() => {
            button.removeClass('animate__bounceIn');
        }, 1000);
    });
    $('[data-click="toggle-aside"]').on('click', function () {
        $('[data-app="collector"] > aside').toggleClass("minimized").addClass('animate__bounceInLeft')
    });

    $('[data-click="open-aside"]').on('click', function () {
        $('[data-app="collector"] > aside').removeClass('closed');
    });
    $('[data-click="close-aside"]').on('click', function () {
        $('[data-app="collector"] > aside').addClass('closed');
    });



    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end, label) {
        $('#infoDateRangePicker input#infoDates').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + (label !== undefined ? ' (predefined range: ' + label + ')' : ""));
    }

    $('#infoDateRangePicker').daterangepicker({
        "showWeekNumbers": true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        "alwaysShowCalendars": true,
        "startDate": "09/03/2022",
        "endDate": "09/09/2022",
        "opens": "left"
    }, cb);

    cb(start, end);
});