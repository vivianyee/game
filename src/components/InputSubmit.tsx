type Props = {
  error?: string;
  buttonLabel: string;
  setInputValue: (x: string) => void;
  onButtonClick: () => void;
};

export const InputSubmit = ({
  error,
  buttonLabel,
  setInputValue,
  onButtonClick,
}: Props) => {
  return (
    <div>
      {error && <div>{error}</div>}
      <input type="text" onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={() => onButtonClick()}>{buttonLabel}</button>
    </div>
  );
};
