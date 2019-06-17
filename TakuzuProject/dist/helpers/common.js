"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hideEmail(email) {
    let hiddenEmail = "";
    for (let i = 0; i < email.length; i++) {
        if (i < email.indexOf("@")) {
            if (email.indexOf("@") > 5) {
                switch (i) {
                    case 0:
                    case 1:
                        hiddenEmail += email[i];
                        break;
                    case email.indexOf("@") - 1:
                    case email.indexOf("@") - 2:
                        hiddenEmail += email[i];
                        break;
                    default:
                        hiddenEmail += "*";
                }
            }
            else {
                switch (i) {
                    case 0:
                        hiddenEmail += email[i];
                        break;
                    case email.indexOf("@") - 1:
                        hiddenEmail += email[i];
                        break;
                    default:
                        hiddenEmail += "*";
                }
            }
        }
        else {
            hiddenEmail += email[i];
        }
    }
    return hiddenEmail;
}
exports.hideEmail = hideEmail;
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.validateEmail = validateEmail;
function validatePhoneNumber(phoneNumber) {
    const phoneno = /^\d{10}$/ || /^\d{11}$/;
    return phoneno.test(String(phoneNumber).toLowerCase());
}
exports.validatePhoneNumber = validatePhoneNumber;
function convertStringToSeconds(timeString) {
    const time = timeString.split(':');
    let seconds;
    try {
        seconds = (+time[0] * 60) + (+time[1]);
    }
    catch (e) {
        seconds = 0;
    }
    return seconds;
}
exports.convertStringToSeconds = convertStringToSeconds;
