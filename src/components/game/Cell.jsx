export default function Cell({ row, col, value, isFixed, isSelected, isFocused, isSame, isLineOrBlock, className, onSelect,
                                 onChange, onBlur}) {
    function handleClick() {
        onSelect?.(row, col);
    }

    function handleChange(event) {
        const val = event.target.value;
        if (val === "") {
            onChange?.(row, col, null);
            return;
        }
        if (/^[1-9]$/.test(val)) {
            onChange?.(row, col, Number(val));
        }
    }

    function handleBlur() {
        onBlur?.();
    }

    const inputEl = (
        <input className="cell-input" maxLength={1} value={value ?? ""} onChange={handleChange} onBlur={handleBlur} inputMode="numeric"
            pattern="[1-9]*" autoFocus={isSelected}/>
    );

    const content = isFixed ? (value ?? "") : isSelected ? inputEl : (value ?? "");

    const extra = [isSelected ? "selected" : "", isFocused ? "cell-focus" : "", isSame ? "cell-same" : "",
        isLineOrBlock ? "cell-lineblock" : "", isFixed ? "cell-fixed" : ""].filter(Boolean).join(" ");

    return (
        <div data-row={row} data-col={col} role="gridcell" aria-selected={isSelected} className={`cell ${className} ${extra}`}
             onClick={handleClick}>
            {content}
        </div>
    );
}
