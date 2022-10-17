const plugin = require('tailwindcss/plugin');

module.exports = {
    plugins: [
        plugin(function({addUtilities, addComponents, e, config}) {
            addUtilities()
        }, {}),
    ]
}