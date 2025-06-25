export function formatCurrency (priceCents){
    return (Math.abs(Math.round(priceCents))/ 100).toFixed(2);
}