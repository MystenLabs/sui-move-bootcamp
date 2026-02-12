import { NOT_CONNECTED_TEXT, NOT_GENERATED_TEXT } from "../utils/constants"

const DebugPanelSection = (
    props: {
        title: React.ReactNode | string,
        items: { key: React.ReactNode | string, value: React.ReactNode | string, valueType?: "code" | "text" }[]
    }
) => {

    const renderValue = (value: React.ReactNode | string, valueType?: "code" | "text") => {
        if (value === NOT_GENERATED_TEXT) {
            return NOT_GENERATED_TEXT
        }
        else if (value === NOT_CONNECTED_TEXT) {
            return NOT_CONNECTED_TEXT
        }
    
        if (valueType === "code") {
            return (
                <code className="text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-2 py-1 rounded">
                    <span className="text-xs">{value}</span>
                </code>)
        }

        return (
            <div className="text-[var(--text-primary)] font-semibold ">
                {value}
            </div>
        )
    }

    return (
        <>
            {/* Configuration Title */}
            <div className="p-4 rounded-xl border border-[var(--border)] my-4 text-center uppercase tracking-wide flex items-center justify-center gap-2 font-bold">
                {props.title}
            </div>

            {props.items.length > 0 && props.items.map((item, index) => (
                <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)]" key={index}>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                        {item.key}
                    </label>
                    {renderValue(item.value, item.valueType)}
                </div>
            ))}
        </>
    )
}

export default DebugPanelSection;