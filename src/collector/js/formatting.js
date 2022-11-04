function formattingCurrency(amount, currenct = "TRY") {
    if (amount && amount != "") {
        const amountArray = amount.split(',')
        if (amountArray.length == 2) {
            let leftNumbers = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amountArray[0]).split(',')[0];
            return leftNumbers + ',' + amountArray[1];
        }
        return '';
    }
    return '';
}


console.log(formattingCurrency('-5297969,93'))