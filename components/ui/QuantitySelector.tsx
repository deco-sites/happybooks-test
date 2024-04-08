import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex w-min">
      <Button
        class="size-8 min-w-8 min-h-8 !border !bg-neutral-100 hover:!text-neutral-100 hover:!bg-success-300 !text-success-300 disabled:!bg-neutral-300 disabled:!border-current disabled:!text-neutral-400 border-success-300 outline-none rounded-full text-base"
        onClick={decrement}
        disabled={disabled || quantity <= 1}
        loading={loading}
      >
        -
      </Button>
      <input
        class="input text-center join-item [appearance:textfield] h-8 w-9 min-w-9 min-h-8 text-base text-neutral-600 !border-none !outline-none !p-0"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="size-8 min-w-8 min-h-8 !border !bg-neutral-100 hover:!text-neutral-100 hover:!bg-success-300 !text-success-300 disabled:!bg-neutral-300 disabled:!border-current disabled:!text-neutral-400 border-success-300 outline-none rounded-full text-base"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
