/********************************** UTILITIES */
function codeLog(str, displayStyle) {
    const spanWrapper = '<span class="^^">$$</span>';
    if (displayStyle) {
        str = spanWrapper.replace('^^', displayStyle)
            .replace('$$', str);
    }
    docObjs.dispCodeLog.innerHTML += str + '<br />';
    docObjs.dispCodeLog.scrollTop = docObjs.dispCodeLog.scrollHeight
}

function deltaMinutes(time, mins) {
    return new Date(new Date(time).setMinutes(time.getMinutes() + mins));
}

function niceDateTime(style = 'time', date = Date.now()) {
    const d = new Date(date);
    const dO = {
        'MM': d.getMonth() + 1,
        'dd': d.getDate(),
        'yy': d.getFullYear().toString().substring(2),
        'hh': (d.getHours() <= 12) ? d.getHours() : d.getHours() - 12,
        'mm': (d.getMinutes() < 10) ? '0' + d.getMinutes().toString() : d.getMinutes(),
        'amPm': (d.getHours() <= 12) ? 'AM' : 'PM'
    }

    const o = {
        'dt': dO.MM + '/' + dO.dd + '/' +dO.yy,
        'tm': dO.hh + ':' + dO.mm + ' ' + dO.amPm
    }

    if (style === 'full') {
        return o.dt + ' ' + o.tm;
    } else if (style === 'date') {
        return o.dt;
    } else {
        return o.tm;
    }
}
