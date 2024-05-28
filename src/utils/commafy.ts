const commafy = (value: string) => {
    if (value === "0") return value;

    let output: string = "";
    let decimal: string = "";
    let isNegative = false;

    if (value.includes(",")) {
        output = value.substring(0, value.indexOf(","));
        decimal = value.substring(value.indexOf(","));
    } else {
        output = value;
    }

    if (parseFloat(value) < 0) {
        isNegative = true;
        output = output.substring(1);
    }

    // output = output.replace(/\./g, ",");
    // decimal = decimal.replace(/\./g, ",");

    return isNegative
        ? "-" + parseFloat(output).toLocaleString() + decimal
        : parseFloat(output).toLocaleString().replace(/,/g, '.') + decimal;
}

export default commafy;