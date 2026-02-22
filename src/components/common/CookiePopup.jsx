import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

/**
 * CookiePopup Component.
 * Відображає банер згоди на використання файлів cookie та локального сховища згідно з правилами GDPR.
 * Містить посилання на сторінку політики конфіденційності. Банер автоматично зникає після згоди користувача
 * (зберігає стан у cookie 'sudoku_gdpr_consent' на 150 днів).
 *
 * @component
 * @name CookiePopup
 * @returns {React.ReactElement} Повертає компонент банера згоди на файли cookie.
 */
export default function CookiePopup() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Got it!"
            cookieName="sudoku_gdpr_consent"
            style={{
                background: "#262626",
                alignItems: "center",
                borderRadius: "12px",
                margin: "0 auto 24px auto",
                maxWidth: "800px",
                border: "1px solid #404040",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                left: "1rem",
                right: "1rem"
            }}
            buttonStyle={{
                background: "#4f46e5",
                color: "#fff",
                borderRadius: "6px",
                fontWeight: "500",
                padding: "8px 20px",
                fontSize: "14px",
                transition: "all 0.2s"
            }}
            expires={150}>
            <div className="text-sm text-neutral-300 pr-4 leading-relaxed">
                This site uses <strong>strictly necessary data</strong> (LocalStorage and Cookies) to save your game state and session. We do not track you. Learn more in our {" "}
                <Link to="/privacy" className="text-indigo-400 font-medium underline hover:text-indigo-300 transition-colors">
                    Privacy Policy (GDPR)
                </Link>.
            </div>
        </CookieConsent>
    );
}