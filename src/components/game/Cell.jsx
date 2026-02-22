/**
 * Cell Component.
 * Відображає окрему клітинку на ігровому полі судоку.
 * Керує станами відображення та обробляє введення користувача.
 * Якщо клітинка вибрана і не є фіксованою, рендерить поле вводу для введення числа від 1 до 9.
 *
 * @component
 * @name Cell
 * @param {Object} props - Властивості компонента.
 * @param {number} props.row - Індекс рядка клітинки (0-8).
 * @param {number} props.col - Індекс стовпця клітинки (0-8).
 * @param {number|null} props.value - Поточне значення клітинки (число від 1 до 9 або null).
 * @param {boolean} props.isFixed - Чи є клітинка стартовою (незмінною).
 * @param {boolean} props.isSelected - Чи вибрана клітинка користувачем у даний момент.
 * @param {boolean} props.isFocused - Загальний прапорець підсвічування (однакове значення, лінія або блок).
 * @param {boolean} props.isSame - Чи збігається значення цієї клітинки з вибраною.
 * @param {boolean} props.isLineOrBlock - Чи знаходиться клітинка на одній лінії або в одному блоці 3x3 з вибраною.
 * @param {string} props.className - Додаткові CSS-класи для відмальовки клітинок.
 * @param {Function} props.onSelect - Коллбек, що викликається при кліку на клітинку.
 * @param {Function} props.onChange - Коллбек, що викликається при зміні значення в клітинці.
 * @param {Function} props.onBlur - Коллбек, що викликається при втраті фокусу полем вводу.
 * @returns {React.ReactElement} Повертає елемент клітинки `<div>`, який містить текст або поле вводу.
 */
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
