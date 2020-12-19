
$(document).ready(function () {
    if (!jQuery) {
        // jQuery is not loaded
        alert("Error jQuery is not loaded");
        return;
    }

    initializations();

});

function initializations() {
    //click handlers
    $("#idCbSwitch").change(function () {
        if (document.getElementById("idCbSwitch").checked == true) {
            showSubContent(idDivSubContentCb);
        }
        else {
            hideSubContent(idDivSubContentCb);
        }
    });

    $("#idUpstageSwitch").change(function () {
        if (document.getElementById("idUpstageSwitch").checked == true) {
            showSubContent(idDivSubContentUpstage);
        }
        else {
            hideSubContent(idDivSubContentUpstage);
        }
    });

    $("#idMotionSwitch").change(function () {
        if (document.getElementById("idMotionSwitch").checked == true) {
            showSubContent(idDivSubContentMotion);
        }
        else {
            hideSubContent(idDivSubContentMotion);
        }
    });

    $("#idSymphonySwitch").change(function () {
        if (document.getElementById("idSymphonySwitch").checked == true) {
            showSubContent(idDivSubContentSymphony);
        }
        else {
            hideSubContent(idDivSubContentSymphony);
        }
    });

    $("#idSilentPeriodSwitch").change(function () {
        if (document.getElementById("idSilentPeriodSwitch").checked == true) {
            showSubContent(idDivSubContentSilentPeriod);
        }
        else {
            hideSubContent(idDivSubContentSilentPeriod);
        }
    });

    /*$("#idVolumeSlider").on('change',function () {
        $("#idVolVal").text($("#idVolumeSlider").val() + "%");
    });*/

    var slide = document.getElementById('idVolumeSlider');
    var VolVal = document.getElementById('idVolVal');
    slide.oninput = function () {
        VolVal.innerHTML = this.value + "%";
    }

    $('#idUserSpace').bind('input propertychange', function() {
        console.log("User input character count: " + this.value.length);
        $("#idSendButton").hide();
        //$('#idSendButton').prop('disabled', true);
  
        if(this.value.length < 120){
          $("#idSendButton").show();
          //$('#idSendButton').prop('disabled', false);
        }

        if(this.value.length < 80*120/100){
            $("#idValidationMsg").text("");
        }
        else if(this.value.length > (8*12) && this.value.length <= 120){
            console.log("User input character count 80% threshold crossed:" + this.value.length/120 * 100 + "%");
            $("#idValidationMsg").html("<i>Heads up! You are approaching character limit of 120. To help you better, please keep the character count less than 120 characters.</i>");
        }
        else if(this.value.length > 120){
            $("#idValidationMsg").html("<i><b>You have exceeded the character limit. To help you better, please keep the character count less than 120 characters.</b></i>");
        }
        else {
        
        }
    });
   


    //Fetch this settings from Server
    //document.getElementById("idSilentPeriodSwitch").checked = true;

    return;
}

function hideSubContent(divId) {
    console.log("Hiding: " + divId);
    $(divId).css('opacity', 1)
        .slideUp(500)
        .animate(
            { opacity: 0 },
            { queue: false, duration: 500 }
        );
}

function showSubContent(divId) {
    console.log("Showing: " + divId);
    $(divId).css('opacity', 0)
        .slideDown(500)
        .animate(
            { opacity: 1 },
            { queue: false, duration: 500 }
        );
}