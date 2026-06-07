import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { GlassMagnifyningIcon } from "../../icons/magnifying-glass-icon";
import "./submit-search-button.styles.scss";

interface Props {
  searchName: string;
}

export function SubmitBasicBtn({ searchName }: Props) {
  const { pending } = useFormStatus();

  const [liveValue, setLiveValue] = useState<string>("");

  useEffect(() => {
    const inputElement = document.getElementById("name") as HTMLInputElement;
    if (!inputElement) return;

    const handleTyping = (event: Event) => {
      const target = event.target as HTMLInputElement;
      setLiveValue(target.value);
    };

    inputElement.addEventListener("input", handleTyping);

    return () => {
      inputElement.removeEventListener("input", handleTyping);
    };
  }, []);

  return (
    <button
      type="submit"
      disabled={pending || searchName == liveValue}
      className="btnSubmitBasicBtn"
    >
      {pending ? "Loading..." : "Search Character"}
      <GlassMagnifyningIcon />
    </button>
  );
}
