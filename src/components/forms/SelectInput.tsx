import * as React from "react";
import { useSelect } from "downshift";

import { Clickable, Text } from "gdq-design";
import ChevronDown from "gdq-design/icons/ChevronDown";
import ChevronUp from "gdq-design/icons/ChevronUp";

import styles from "./SelectInput.mod.css";
import classNames from "classnames";

interface SelectItem<T> {
  name: string;
  value: T;
}

function defaultRenderPlaceholder() {
  return <Text className={styles.placeholder}>Select an Option</Text>;
}

function defaultRenderItem<T>(item: SelectItem<T>) {
  return <Text className={styles.defaultItem}>{item.name}</Text>;
}

export interface SelectInputProps<T> {
  items: SelectItem<T>[];
  selectedItem?: SelectItem<T>;
  className?: string;
  renderItem?: (item: SelectItem<T>) => React.ReactNode;
  renderPlaceholder?: () => React.ReactNode;
  onSelect: (item?: SelectItem<T>) => unknown;
}

export function SelectInput<T>(props: SelectInputProps<T>) {
  const {
    items,
    selectedItem,
    className,
    renderItem = defaultRenderItem,
    renderPlaceholder = defaultRenderPlaceholder,
    onSelect,
  } = props;
  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => onSelect(selectedItem ?? undefined),
  });

  const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

  return (
    <div className={classNames(styles.container, className, { [styles.open]: isOpen })}>
      <Clickable className={styles.input} {...getToggleButtonProps()}>
        {selectedItem != null ? renderItem(selectedItem) : renderPlaceholder()}
        <ChevronIcon size={24} className={styles.chevron} />
      </Clickable>
      {isOpen && (
        <ul {...getMenuProps()} className={styles.dropdown}>
          {items.map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
              className={classNames(styles.itemContainer, {
                [styles.itemHighlighted]: highlightedIndex === index,
              })}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
