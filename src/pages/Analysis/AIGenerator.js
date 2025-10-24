import React from 'react';

function AIGenerator({ title, buttonText, idea, onGenerate, isGenerating, color, Icon, ideaBg, ideaTextColor }) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">{title}</h3>
            <button onClick={onGenerate} disabled={isGenerating}
                className={`w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md transition-colors duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed ${color}`}>
                {isGenerating ? 'Generating...' : <><Icon className="h-5 w-5 mr-2" />{buttonText}</>}
            </button>
            {idea && <div className={`mt-3 p-4 rounded-lg text-sm whitespace-pre-wrap border ${ideaBg} ${ideaTextColor} border-current/20`}>{idea}</div>}
        </div>
    );
}

export default AIGenerator;