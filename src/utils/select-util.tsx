// Tree node interface
interface TreeNode {
  name: string; // Display text
  id: string | number; // Value
  children?: TreeNode[]; // Optional children
}

// Selector option format
interface SelectOption {
  title: string;
  value: string | number;
  children?: SelectOption[];
}

// Generic option format for AdvancedSelect
export interface AdvancedSelectOption {
  label: string;
  value: string | number;
}

// Generic utility function to convert list data to Options data
export function convertToOptions<T>(
  items: T[],
  valueKey: keyof T,
  labelKey: keyof T
): AdvancedSelectOption[] {
  return items.map((item) => ({
    value: item[valueKey] as string | number,
    label: item[labelKey] as string,
  }));
}

// Converts tree to selector options
export class TreeSelectUtil {
  static convert(items: TreeNode[]): SelectOption[] {
    return items.map(({ name, id, children }) => ({
      title: name,
      value: id,
      ...(children?.length && { children: this.convert(children) }),
    }));
  }
}
