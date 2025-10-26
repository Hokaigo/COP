export function formatTime(seconds){
    const sec = Math.max(0, Math.floor(seconds || 0));
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${String(s).padStart(2, "0")}`;
}
