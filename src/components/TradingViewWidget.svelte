<script>
    export let symbol;
    export let theme;
</script>
  
<iframe
    title="chart"
    src={
        "https://s.tradingview.com/widgetembed/?"
        + `symbol=${symbol}&utm_term=${symbol}`
        + "&interval=1&hidetoptoolbar=1&hidelegend=1&saveimage=0&studies=%5B%5D"
        + `&theme=${theme}`
        + "&style=2&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&utm_source=localhost&utm_medium=widget&utm_campaign=chart"
    }
    class="w-full h-full"
    allowtransparency="true"
    scrolling="no"
    allowfullscreen />