import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import privacyMd from '../../PRIVACY_POLICY.md?raw';

/**
 * PrivacyPage Component.
 * Сторінка політики конфіденційності, яка рендерить Markdown файл.
 *
 * @component
 * @name PrivacyPage
 * @returns {React.ReactElement} Сторінка з відформатованим текстом політики.
 */
export default function PrivacyPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-neutral-800 p-6 md:p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto my-8 border border-neutral-700">

            <div className="w-full">
                <ReactMarkdown
                    components={{
                        h1: ({ ...props }) => (
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 pb-4 border-b border-neutral-700" {...props} />
                        ),
                        h2: ({ ...props }) => (
                            <h2 className="text-xl md:text-2xl font-bold text-indigo-400 mt-10 mb-4" {...props} />
                        ),
                        p: ({ ...props }) => (
                            <p className="text-neutral-300 mb-4 leading-relaxed text-sm md:text-base" {...props} />
                        ),
                        ul: ({ ...props }) => (
                            <ul className="list-none mb-6 space-y-3 text-neutral-300" {...props} />
                        ),
                        li: ({ ...props }) => (
                            <li className="relative pl-6 leading-relaxed text-sm md:text-base before:content-['—'] before:absolute before:left-0 before:text-indigo-500 before:font-bold" {...props} />
                        ),
                        strong: ({ ...props }) => (
                            <strong className="text-white font-semibold mr-1" {...props} />
                        )
                    }}>
                    {privacyMd}
                </ReactMarkdown>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-700 flex justify-center">
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-md">
                    Back to Home
                </button>
            </div>
        </div>
    );
}