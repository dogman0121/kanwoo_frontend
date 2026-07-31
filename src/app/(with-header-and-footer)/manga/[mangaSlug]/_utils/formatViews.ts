export default function formatViews(num: number): string {
    if (num < 0 || !isFinite(num)) {
        return '0';
    }

    if (num < 1000) {
        return num.toString();
    }

    const units = ['', 'K', 'М', 'B', 'T'];
    const threshold = 1000;
    
    const order = Math.floor(Math.log10(num) / Math.log10(threshold));
    
    const clampedOrder = Math.min(order, units.length - 1);
    
    const value = num / Math.pow(threshold, clampedOrder);
    
    const formattedValue = value % 1 === 0 
        ? value.toString() 
        : value.toFixed(1);
    
    return formattedValue + units[clampedOrder];
}