type SortEvents = {
  onSortAZ?: () => void;
  onSortDate?: () => void;
  onSearch?: (value: string) => void;
};

export class SortView {
  constructor(
    private elements: {
      sortAZ: HTMLElement;
      sortDate: HTMLElement;
      search: HTMLInputElement;
    },
    private events: SortEvents,
  ) {
    this.register();
  }

  private register() {
    this.elements.sortAZ.addEventListener("click", () =>
      this.events.onSortAZ?.(),
    );

    this.elements.sortDate.addEventListener("click", () =>
      this.events.onSortDate?.(),
    );

    this.elements.search.addEventListener("input", () =>
      this.events.onSearch?.(this.elements.search.value),
    );
  }
}
