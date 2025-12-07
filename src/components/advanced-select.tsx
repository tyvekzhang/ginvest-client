'use client';

import type { SelectProps } from 'antd';
import { Avatar, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface AdvancedSelectOption {
  key?: string;
  label: React.ReactNode;
  value: string | number;
  avatar?: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface AdvancedSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  options?: AdvancedSelectOption[];
  fetchOptions?: (search: string) => Promise<AdvancedSelectOption[]>;
  enableSearch?: boolean;
  debounceTimeout?: number;
  searchPlaceholder?: string;
  loading?: boolean;
  loadingText?: React.ReactNode;
  showAvatar?: boolean;
  emptyText?: React.ReactNode;
  allowClear?: boolean;
  maxTagCount?: number;
  autoLoadOnMount?: boolean;
}

function AdvancedSelect<ValueType = any>({
  options: staticOptions = [],
  fetchOptions,
  enableSearch = false,
  debounceTimeout = 300,
  searchPlaceholder,
  loading: externalLoading = false,
  loadingText = <Spin size="small" />,
  showAvatar = true,
  emptyText = '未找到结果',
  allowClear = false,
  maxTagCount,
  autoLoadOnMount = false,
  ...props
}: AdvancedSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState<AdvancedSelectOption[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const fetchRef = useRef(0);

  const allOptions = useMemo(() => {
    if (fetchOptions) {
      return dynamicOptions;
    }

    if (enableSearch && searchValue && staticOptions.length > 0) {
      return staticOptions.filter(
        (option) =>
          String(option.label)
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          String(option.value)
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
      );
    }

    return staticOptions;
  }, [staticOptions, dynamicOptions, fetchOptions, enableSearch, searchValue]);

  const debounceFetcher = useMemo(() => {
    if (!fetchOptions) return undefined;

    const loadOptions = async (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setFetching(true);

      try {
        const newOptions = await fetchOptions(value);

        if (fetchId === fetchRef.current) {
          setDynamicOptions(newOptions);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        if (fetchId === fetchRef.current) {
          setDynamicOptions([]);
        }
      } finally {
        if (fetchId === fetchRef.current) {
          setFetching(false);
        }
      }
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    if (autoLoadOnMount && fetchOptions && debounceFetcher) {
      debounceFetcher('');
    }
  }, [autoLoadOnMount, fetchOptions, debounceFetcher]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (debounceFetcher) {
      if (value !== searchValue) {
        setDynamicOptions([]);
      }
      debounceFetcher(value);
    }
  };

  const optionRender = (option: any) => {
    const optionData = option.data || option;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showAvatar && optionData.avatar && (
          <Avatar
            src={optionData.avatar}
            size="small"
            style={{ marginRight: 8 }}
          />
        )}
        <span>{option.label}</span>
      </div>
    );
  };

  const isLoading = externalLoading || fetching;
  const notFoundContent = isLoading ? loadingText : emptyText;

  return (
    <Select
      {...props}
      options={allOptions}
      loading={isLoading}
      showSearch={enableSearch}
      filterOption={false}
      onSearch={enableSearch ? handleSearch : undefined}
      notFoundContent={notFoundContent}
      placeholder={searchPlaceholder || props.placeholder}
      maxTagCount={maxTagCount}
      optionRender={showAvatar ? optionRender : undefined}
      allowClear={allowClear}
    />
  );
}

export default AdvancedSelect;