/**
 * Footer Component.
 * Відображає нижній колонтитул вебдодатка, який містить інформацію про авторські права.
 *
 * @component
 * @name Footer
 * @returns {React.ReactElement} Повертає елемент `<footer>` з текстом копірайту.
 */
export default function Footer() {
    return (
        <footer className="app-footer text-neutral-200 text-center py-5 mt-auto">
            <div className="max-w-6xl mx-auto px-4">
                <p className="text-sm opacity-90">
                    &copy; Sudoku Game App. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
