interface RangeSliderProps {
    min?: number;
    max?: number;
    value: number;
    onChange: (val:string) => void;
}

export function RangeSlider(props:RangeSliderProps) {
    const {min, max, value, onChange}  = props;
    const handleChange = (val:string) => {
        onChange(val);
    }
    return <input type="range" min={min || 0} max={max} value={value} onChange={ev => handleChange(ev.currentTarget.value)} />
}