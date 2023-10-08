$(document).ready(function () {
    // Function to update the current date and time
    function updateDateTime() {
        var currentDate = dayjs().format('dddd, MMMM D, YYYY');
        $('#currentDate').text(currentDate);
    }

    function updateTimeBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    $(".saveBtn").on("click", function () {
        var hour = $(this).parent().attr("id");
        var description = $(this).siblings(".description").val();
        localStorage.setItem(hour, description);
    });

    $(".time-block").each(function () {
        var hour = $(this).attr("id");
        var description = localStorage.getItem(hour);
        $(this).find(".description").val(description);
    });

    updateDateTime();
    updateTimeBlocks();

    setInterval(function () {
        updateDateTime();
        updateTimeBlocks();
    }, 60000);
});