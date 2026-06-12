import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubmitBasicBtn } from "./submit-search-button.component";

const renderComponent = (searchName = "") => {
  const utils = render(<SubmitBasicBtn searchName={searchName} />);
  return { ...utils };
};

describe("SubmitBasicBtn Component", () => {});
