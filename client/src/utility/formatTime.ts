export function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours} hr ${remainingMinutes} min`;
    } else if (hours > 0) {
        return `${hours} hr`;
    } else {
        return `${remainingMinutes} min`;
    }
}